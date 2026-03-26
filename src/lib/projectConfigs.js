import kota from '../content/projects/kota.json';
import advisable from '../content/projects/advisable.json';

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function validateImage(img, projectKey, rowIdx, imageIdx) {
  assert(!!img, `Missing image config (${projectKey})`);
  assert(typeof img.file === 'string' && img.file.trim().length > 0, `Invalid image.file in ${projectKey} (row ${rowIdx}, image ${imageIdx})`);
  if (img.alt != null) {
    assert(typeof img.alt === 'string', `Invalid image.alt in ${projectKey} (row ${rowIdx}, image ${imageIdx})`);
  }
}

function validateProject(project, projectKey) {
  assert(project && project.key === projectKey, `Invalid project config key for ${projectKey}`);

  assert(typeof project.title === 'string', `Missing project.title for ${projectKey}`);
  assert(typeof project.subtitle === 'string', `Missing project.subtitle for ${projectKey}`);
  assert(typeof project.description === 'string', `Missing project.description for ${projectKey}`);

  assert(project.workPreview && Array.isArray(project.workPreview.images), `Missing workPreview.images for ${projectKey}`);
  project.workPreview.images.forEach((img, idx) => {
    validateImage(img, projectKey, 'workPreview', idx);
  });

  const rows = project.detailGrid?.rows;
  assert(Array.isArray(rows), `Missing detailGrid.rows for ${projectKey}`);

  rows.forEach((row, rowIdx) => {
    assert(row && (row.layout === 'single' || row.layout === 'double'), `Invalid row.layout in ${projectKey} (row ${rowIdx})`);
    const imgs = row.images;
    assert(Array.isArray(imgs), `Invalid row.images in ${projectKey} (row ${rowIdx})`);

    if (row.layout === 'single') {
      assert(imgs.length === 1, `Row must have exactly 1 image for layout=single (${projectKey}, row ${rowIdx})`);
    } else {
      assert(imgs.length === 2, `Row must have exactly 2 images for layout=double (${projectKey}, row ${rowIdx})`);
    }

    imgs.forEach((img, imageIdx) => validateImage(img, projectKey, rowIdx, imageIdx));
  });

  // Social / OG
  assert(project.social?.ogImage, `Missing social.ogImage for ${projectKey}`);
  assert(Number.isFinite(project.social?.ogWidth), `Missing social.ogWidth for ${projectKey}`);
  assert(Number.isFinite(project.social?.ogHeight), `Missing social.ogHeight for ${projectKey}`);

  return project;
}

const validatedProjects = {
  kota: validateProject(kota, 'kota'),
  advisable: validateProject(advisable, 'advisable')
};

export function getProjectConfig(key) {
  const project = validatedProjects[key];
  assert(!!project, `Unknown project config: ${key}`);
  return project;
}

