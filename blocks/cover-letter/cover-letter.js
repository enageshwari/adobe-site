/**
 * Cover Letter block.
 *
 * Expected authored structure (single cell holding the letter):
 *   | Cover Letter |
 *   | Dear Hiring Team,                              |
 *   | ...body paragraphs...                          |
 *   | Warm regards,\n[Your Name]                     |
 *
 * Decoration lifts the letter content out of the wrapping cells, marks the
 * greeting and signature, and styles the whole thing as a letter card.
 *
 * @param {Element} block The block element
 */
export default function decorate(block) {
  // flatten the single-cell wrapper (block > div > div > content)
  const inner = block.querySelector(':scope > div > div') || block.querySelector(':scope > div');
  if (!inner) return;

  const body = document.createElement('div');
  body.className = 'cover-letter-body';
  while (inner.firstChild) body.append(inner.firstChild);
  block.replaceChildren(body);

  const paragraphs = [...body.querySelectorAll(':scope > p')];
  if (paragraphs.length) {
    // first paragraph reads as the greeting
    paragraphs[0].classList.add('cover-letter-greeting');
    // last paragraph reads as the sign-off / signature
    paragraphs[paragraphs.length - 1].classList.add('cover-letter-signature');
  }
}
