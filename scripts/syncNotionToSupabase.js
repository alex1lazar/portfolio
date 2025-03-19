import { Client } from '@notionhq/client';
import { createClient } from '@supabase/supabase-js';

// Initialize Notion and Supabase clients using environment variables
const notion = new Client({ auth: process.env.NOTION_TOKEN });
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Your Notion database ID
const notionDatabaseId = process.env.NOTION_DATABASE_ID;

async function syncNotionToSupabase() {
  try {
    console.log("Fetching data from Notion...");
    const { results } = await notion.databases.query({
      database_id: notionDatabaseId,
    });

    for (const page of results) {
      const title = page.properties.Title.title?.[0]?.text?.content || "Untitled";
      const author = page.properties.Author.rich_text?.[0]?.text?.content || "Unknown";
      const finished = page.properties.Finished?.checkbox || false;

      // Check for existing record in Supabase
      const { data: existingBook } = await supabase
        .from('books')
        .select('id')
        .eq('title', title)
        .single();

      if (existingBook) {
        console.log(`Updating: ${title}`);
        await supabase
          .from('books')
          .update({ author, finished })
          .eq('id', existingBook.id);
      } else {
        console.log(`Inserting: ${title}`);
        await supabase.from('books').insert([{ title, author, finished }]);
      }
    }

    console.log("✅ Sync completed successfully!");
  } catch (error) {
    console.error("❌ Error during sync:", error);
    process.exit(1); // Ensure GitHub Action fails if there is an error
  }
}

syncNotionToSupabase();
