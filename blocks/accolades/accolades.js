/**
 * Accolades block — awards, recognition, and notable wins.
 *
 * Expected authored structure (two columns per row):
 *   | Accolades |
 *   | Employee of the Year, 2024 | Recognized among 400+ engineers for platform work |
 *   | Top 1% Contributor         | Open-source project with 12k GitHub stars         |
 *
 * Left column = the accolade headline. Right column = the supporting detail.
 * Decoration builds a responsive grid of cards.
 *
 * @param {Element} block The block element
 */
export default function decorate(block) {
  const list = document.createElement('ul');
  list.className = 'accolades-list';

  [...block.children].forEach((row) => {
    const cells = [...row.children];
    const li = document.createElement('li');
    li.className = 'accolades-item';

    const headline = document.createElement('div');
    headline.className = 'accolades-headline';
    if (cells[0]) while (cells[0].firstChild) headline.append(cells[0].firstChild);

    const detail = document.createElement('div');
    detail.className = 'accolades-detail';
    if (cells[1]) while (cells[1].firstChild) detail.append(cells[1].firstChild);

    li.append(headline, detail);
    list.append(li);
  });

  block.replaceChildren(list);
}
