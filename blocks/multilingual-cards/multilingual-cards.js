import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {

  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
	const anchor = document.createElement('a');
    anchor.href = '';
	const isLink = row.querySelector('div > a');

    while (row.firstElementChild) {
		if(isLink){
			li.append(row.firstElementChild)
			anchor.append(li);
		} else {	
			li.append(row.firstElementChild);
		}
	}

    [...li.children].forEach((div) => {
		if(div.children.length === 1 && div.querySelector('a')) {
			const linkURL = div.querySelector('a').innerHTML;
			anchor.href = linkURL;
			div.className = 'cards-hide-markdown';
		} else if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });
	
	if(isLink){
		ul.append(anchor);
	} else {
		ul.append(li);
	}

  });

  ul.querySelectorAll('img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);
}