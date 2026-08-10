/**
 * Requirements block — maps a role's requirements to your matching evidence.
 *
 * Expected authored structure (two columns per row):
 *   | Requirements |
 *   | 5+ years building scalable backends | 6 yrs on services handling 2M req/day |
 *   | Strong TypeScript & React           | Shipped 3 production React apps in TS  |
 *
 * Left column = what the job asks for. Right column = how you meet it.
 * Decoration builds an accessible definition-style list with a connector.
 *
 * @param {Element} block The block element
 */
export default function decorate(block) {
  const list = document.createElement('ul');
  list.className = 'requirements-list';

  [...block.children].forEach((row) => {
    const cells = [...row.children];
    const li = document.createElement('li');
    li.className = 'requirements-item';

    const need = document.createElement('div');
    need.className = 'requirements-need';
    if (cells[0]) while (cells[0].firstChild) need.append(cells[0].firstChild);

    const match = document.createElement('div');
    match.className = 'requirements-match';
    if (cells[1]) while (cells[1].firstChild) match.append(cells[1].firstChild);

    li.append(need, match);
    list.append(li);
  });

  block.replaceChildren(list);
}
