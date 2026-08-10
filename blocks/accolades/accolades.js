/**
 * Accolades block — awards, recognition, and notable wins.
 *
 * Expected authored structure. An optional leading image cell adds an icon
 * to each card; omit it and the card renders headline + detail as before.
 *   | Accolades |
 *   | <image or url> | Employee of the Year, 2024 | Recognized among 400+ engineers |
 *   | <image or url> | Top 1% Contributor         | Open-source project, 12k stars  |
 *
 * Per-accolade image: put any of the following in the first cell —
 *   - an inserted image (DA image picker → <picture>/<img>)
 *   - a link whose target is an image (e.g. /icons/accolade.svg)
 *   - a plain image URL as text (e.g. https://…/badge.png)
 * A row with none of these treats the first cell as the headline.
 *
 * @param {Element} block The block element
 */
const IMAGE_URL = /\.(svg|png|jpe?g|gif|webp|avif)(\?.*)?$/i;

/**
 * Resolves the image source authored in a cell, if any.
 * @param {Element} cell
 * @returns {string|null} the image URL, or null if the cell holds no image
 */
function imageSrcFromCell(cell) {
  if (!cell) return null;
  const media = cell.querySelector('picture img, img');
  if (media) return media.getAttribute('src');
  const link = cell.querySelector('a[href]');
  if (link && IMAGE_URL.test(link.getAttribute('href'))) return link.getAttribute('href');
  const text = cell.textContent.trim();
  if (IMAGE_URL.test(text)) return text;
  return null;
}

export default function decorate(block) {
  const list = document.createElement('ul');
  list.className = 'accolades-list';

  [...block.children].forEach((row) => {
    const cells = [...row.children];
    const li = document.createElement('li');
    li.className = 'accolades-item';

    const src = imageSrcFromCell(cells[0]);
    const headlineCell = src ? cells[1] : cells[0];
    const detailCell = src ? cells[2] : cells[1];

    if (src) {
      const media = document.createElement('div');
      media.className = 'accolades-media';
      const img = document.createElement('img');
      img.src = src;
      img.alt = '';
      img.loading = 'lazy';
      media.append(img);
      li.append(media);
    }

    const headline = document.createElement('div');
    headline.className = 'accolades-headline';
    if (headlineCell) while (headlineCell.firstChild) headline.append(headlineCell.firstChild);

    const detail = document.createElement('div');
    detail.className = 'accolades-detail';
    if (detailCell) while (detailCell.firstChild) detail.append(detailCell.firstChild);

    li.append(headline, detail);
    list.append(li);
  });

  block.replaceChildren(list);
}
