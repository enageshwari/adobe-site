/**
 * Timeline block — a vertical list of experience / education entries.
 *
 * Expected authored structure (two columns per row):
 *   | Timeline |
 *   | 2022 — Present | **Senior Software Engineer**, Company\nWhat you did... |
 *   | 2019 — 2022    | **Software Engineer**, Company\nWhat you did...        |
 *
 * The left column is the time period / meta, the right column is the role and
 * description. Decoration converts the rows into an ordered list with markers.
 *
 * @param {Element} block The block element
 */
export default function decorate(block) {
  const ol = document.createElement('ol');
  ol.className = 'timeline-list';

  [...block.children].forEach((row) => {
    const cells = [...row.children];
    const li = document.createElement('li');
    li.className = 'timeline-entry';

    const meta = document.createElement('div');
    meta.className = 'timeline-meta';
    if (cells[0]) while (cells[0].firstChild) meta.append(cells[0].firstChild);

    const content = document.createElement('div');
    content.className = 'timeline-content';
    if (cells[1]) while (cells[1].firstChild) content.append(cells[1].firstChild);

    li.append(meta, content);
    ol.append(li);
  });

  block.replaceChildren(ol);
}
