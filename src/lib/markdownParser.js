/**
 * Parser for Notion-exported markdown files to CaseStudy sections format
 * Handles special HTML comment blocks and regular markdown content
 */

/**
 * Parse an <aside> block to extract overview data
 * @param {string} asideContent - The content inside the <aside> tag
 * @returns {Object} Overview section object
 */
function parseAsideBlock(asideContent) {
  const lines = asideContent.trim().split('\n').filter(line => line.trim());
  let title = 'Overview';
  const items = [];
  let icon = '💡'; // Default icon

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('Title:')) {
      title = trimmed.replace('Title:', '').trim();
    } else if (trimmed.startsWith('-') || trimmed.startsWith('*')) {
      // Remove list marker and any leading whitespace
      let item = trimmed.replace(/^[-*]\s*/, '').trim();
      // Keep bold markers - we'll parse them in the component
      items.push(item);
    } else if (trimmed.match(/^[💡🔍📊🎯]/)) {
      // Extract emoji icon if present at start of title
      const emojiMatch = trimmed.match(/^([💡🔍📊🎯])/);
      if (emojiMatch) {
        icon = emojiMatch[1];
        // Remove emoji from title if it's in the title line
        if (trimmed.includes('Title:')) {
          title = trimmed.replace(/^[💡🔍📊🎯]\s*/, '').replace('Title:', '').trim();
        }
      }
    }
  }

  // Check if title starts with emoji
  const titleEmojiMatch = title.match(/^([💡🔍📊🎯])/);
  if (titleEmojiMatch) {
    icon = titleEmojiMatch[1];
    title = title.replace(/^[💡🔍📊🎯]\s*/, '').trim();
  }

  return {
    type: 'overview',
    title,
    items,
    icon
  };
}

/**
 * Parse markdown content and convert to sections array
 * @param {string} markdown - The markdown content
 * @param {Object} carouselMap - Map of carousel names to image arrays
 * @returns {Array} Array of section objects
 */
export function parseMarkdownToSections(markdown, carouselMap = {}) {
  const sections = [];
  const lines = markdown.split('\n');
  
  let i = 0;
  let currentParagraph = [];
  let inOverviewBlock = false;
  let overviewContent = [];
  let inCarouselBlock = false;
  let carouselName = null;
  let carouselTitle = null;

  while (i < lines.length) {
    const line = lines[i];
    const trimmedLine = line.trim();

    // Handle HTML comment blocks
    if (trimmedLine === '<!-- OVERVIEW -->') {
      inOverviewBlock = true;
      overviewContent = [];
      i++;
      continue;
    }

    if (trimmedLine === '<!-- END_OVERVIEW -->') {
      if (inOverviewBlock && overviewContent.length > 0) {
        let asideContent = overviewContent.join('\n');
        // Extract content from <aside> tags if present
        const asideMatch = asideContent.match(/<aside>([\s\S]*?)<\/aside>/i);
        if (asideMatch) {
          asideContent = asideMatch[1];
        }
        const overview = parseAsideBlock(asideContent);
        sections.push(overview);
      }
      inOverviewBlock = false;
      overviewContent = [];
      i++;
      continue;
    }

    if (trimmedLine.startsWith('<!-- CAROUSEL:')) {
      // Extract carousel name: <!-- CAROUSEL:problems -->
      const match = trimmedLine.match(/<!-- CAROUSEL:(\w+) -->/);
      if (match) {
        inCarouselBlock = true;
        carouselName = match[1];
        carouselTitle = null; // Will be set from heading if found
      }
      i++;
      continue;
    }

    if (trimmedLine === '<!-- END_CAROUSEL -->') {
      if (inCarouselBlock && carouselName) {
        // Get images from carouselMap or use placeholder
        const images = carouselMap[carouselName] || [];
        sections.push({
          type: 'carousel',
          id: `${carouselName}-carousel`, // Add ID for anchor links
          title: carouselTitle || getCarouselTitle(carouselName),
          images: images.length > 0 ? images : [{
            src: 'https://via.placeholder.com/1200x726/f0f0f0/666?text=Add+images+to+carousel',
          }],
          aspectRatio: '200/121'
        });
      }
      inCarouselBlock = false;
      carouselName = null;
      carouselTitle = null;
      i++;
      continue;
    }

    // If we're inside an overview block, collect content
    if (inOverviewBlock) {
      overviewContent.push(line);
      i++;
      continue;
    }

    // Collect carousel block content (headings/paragraphs before carousel)
    if (inCarouselBlock) {
      // Extract heading if present to use as carousel title
      if (trimmedLine.startsWith('#')) {
        const level = trimmedLine.match(/^#+/)[0].length;
        const headingText = trimmedLine.replace(/^#+\s*/, '').trim();
        
        if (level === 2 && !carouselTitle) {
          carouselTitle = headingText;
        }
      }
      // Skip other content in carousel block (paragraphs, etc.)
      i++;
      continue;
    }

    // Handle   s
    if (trimmedLine.startsWith('#')) {
      // Flush any accumulated paragraph
      if (currentParagraph.length > 0) {
        sections.push({
          type: 'paragraph',
          content: currentParagraph.join(' ').trim()
        });
        currentParagraph = [];
      }

      const level = trimmedLine.match(/^#+/)[0].length;
      const headingText = trimmedLine.replace(/^#+\s*/, '').trim();
      
      if (level === 1) {
        // H1 - usually the title, skip it (title is passed separately to CaseStudy)
        i++;
        continue;
      } else if (level === 2) {
        // Generate ID from heading text for anchor links
        const headingId = headingText.toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '');
        sections.push({
          type: 'heading',
          content: headingText,
          id: headingId
        });
      } else if (level === 3) {
        // Generate ID from subheading text
        const subheadingId = headingText.toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '');
        sections.push({
          type: 'subheading',
          content: headingText,
          id: subheadingId
        });
      } else if (level >= 4) {
        // H4+ treated as subheadings
        const subheadingId = headingText.toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '');
        sections.push({
          type: 'subheading',
          content: headingText,
          id: subheadingId
        });
      }
      i++;
      continue;
    }

    // Handle lists (both bullet and numbered)
    if (trimmedLine.match(/^[-*]\s/) || trimmedLine.match(/^\d+\.\s/)) {
      // Flush any accumulated paragraph
      if (currentParagraph.length > 0) {
        sections.push({
          type: 'paragraph',
          content: currentParagraph.join(' ').trim()
        });
        currentParagraph = [];
      }

      // Helper function to parse a list item and its children
      const parseListItem = (line, baseIndent = 0) => {
        const trimmed = line.trim();
        const indent = line.match(/^(\s*)/)[1].length;
        const bulletMatch = trimmed.match(/^[-*]\s(.+)$/);
        const numberedMatch = trimmed.match(/^\d+\.\s(.+)$/);
        
        if (!bulletMatch && !numberedMatch) {
          return null;
        }
        
        let itemText = (bulletMatch ? bulletMatch[1] : numberedMatch[1]).trim();
        // Keep links and bold markers - we'll parse them in the component
        
        return {
          text: itemText,
          indent: indent,
          isNumbered: !!numberedMatch
        };
      };

      const listItems = [];
      const itemStack = []; // Stack to track parent items for nesting (with indent level)
      
      while (i < lines.length) {
        const listLine = lines[i];
        const item = parseListItem(listLine);
        
        if (!item) {
          // Not a list item anymore, break
          break;
        }
        
        // Determine nesting level
        const currentIndent = item.indent;
        
        // Pop items from stack that are at same or higher indent level
        while (itemStack.length > 0 && itemStack[itemStack.length - 1].indent >= currentIndent) {
          itemStack.pop();
        }
        
        const listItem = {
          text: item.text,
          children: []
        };
        
        if (itemStack.length > 0) {
          // This is a nested item, add to parent's children
          itemStack[itemStack.length - 1].item.children.push(listItem);
        } else {
          // Top-level item
          listItems.push(listItem);
        }
        
        // Push to stack for potential children (store both item reference and indent)
        itemStack.push({ item: listItem, indent: currentIndent });
        
        i++;
      }
      
      if (listItems.length > 0) {
        // Clean up empty children arrays
        const cleanItems = (items) => {
          return items.map(item => ({
            text: item.text,
            ...(item.children && item.children.length > 0 ? { children: cleanItems(item.children) } : {})
          }));
        };
        
        sections.push({
          type: 'list',
          items: cleanItems(listItems)
        });
      }
      continue;
    }

    // Handle empty lines
    if (trimmedLine === '') {
      // Flush accumulated paragraph if we have one
      if (currentParagraph.length > 0) {
        sections.push({
          type: 'paragraph',
          content: currentParagraph.join(' ').trim()
        });
        currentParagraph = [];
      }
      i++;
      continue;
    }

    // Handle links (standalone)
    if (trimmedLine.startsWith('[') && trimmedLine.includes('](')) {
      const linkMatch = trimmedLine.match(/\[([^\]]*)\]\(([^)]+)\)/);
      if (linkMatch && linkMatch[1]) {
        // Only add link if it has text (skip empty links like [](url))
        // Flush any accumulated paragraph
        if (currentParagraph.length > 0) {
          sections.push({
            type: 'paragraph',
            content: currentParagraph.join(' ').trim()
          });
          currentParagraph = [];
        }
        
        sections.push({
          type: 'link',
          url: linkMatch[2],
          text: linkMatch[1]
        });
        i++;
        continue;
      } else if (linkMatch && !linkMatch[1]) {
        // Empty link, skip it
        i++;
        continue;
      }
    }

    // Regular paragraph content
    if (trimmedLine) {
      // Keep links and bold markers - we'll parse them in the component
      currentParagraph.push(trimmedLine);
    }

    i++;
  }

  // Flush any remaining paragraph
  if (currentParagraph.length > 0) {
    sections.push({
      type: 'paragraph',
      content: currentParagraph.join(' ').trim()
    });
  }

  return sections;
}

/**
 * Get a human-readable title for a carousel based on its name
 */
function getCarouselTitle(carouselName) {
  const titleMap = {
    'problems': 'What\'s broken in their experience?',
    'solutions': 'Improving the experience while providing ways for growth',
    'default': 'Gallery'
  };
  return titleMap[carouselName] || titleMap['default'];
}

/**
 * Load and parse a markdown file
 * @param {string} markdownContent - The raw markdown content
 * @param {Object} carouselMap - Map of carousel names to image arrays
 * @returns {Array} Parsed sections array
 */
export function loadMarkdownCaseStudy(markdownContent, carouselMap = {}) {
  return parseMarkdownToSections(markdownContent, carouselMap);
}


