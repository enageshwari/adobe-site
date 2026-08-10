/**
 * Contact block — a compact row of contact links / call-to-action.
 *
 * Expected authored structure (single cell of links, one per line):
 *   | Contact |
 *   | [email@example.com](mailto:email@example.com)  |
 *   | [GitHub](https://github.com/you)               |
 *   | [LinkedIn](https://linkedin.com/in/you)         |
 *
 * Decoration collects the authored links into an accessible inline list.
 *
 * @param {Element} block The block element
 */
export default function decorate(block) {
  const links = [...block.querySelectorAll('a')];
  const ul = document.createElement('ul');
  ul.className = 'contact-links';

  links.forEach((a) => {
    const li = document.createElement('li');
    a.classList.remove('button');
    a.closest('p')?.classList.remove('button-wrapper');
    li.append(a);
    ul.append(li);
  });

  block.replaceChildren(ul);
}
