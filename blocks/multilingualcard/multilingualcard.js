import { createOptimizedPicture } from "../../scripts/aem.js";

export default function decorate(block) {
  const ul = document.createElement("ul");
	const languagesDropdown = document.createElement("select");
	const languages = [];

  [...block.children].forEach((row) => {
		//languages[row.firstElementChild.innerHTML] = 
    const li = document.createElement("li");
    const anchor = document.createElement("a");
    anchor.href = "";
    const isLink = row.querySelector("div a");

    const languageChild = row.firstElementChild;
		const language = languageChild.firstElementChild.innerHTML;
		languages.push(language);
		row.removeChild(languageChild);
		
		// Assign language to li element
		anchor.className = language;

		while (row.firstElementChild) {
      if (isLink) {
        li.append(row.firstElementChild);
        anchor.append(li);
      } else {
        li.append(row.firstElementChild);
      }
    }

    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector("a")) {
        const linkURL = div.querySelector("a").innerHTML;
        anchor.href = linkURL;
        div.className = "cards-hide-markdown";
      } else if (div.children.length === 1 && div.querySelector("picture"))
        div.className = "cards-card-image";
      else div.className = "cards-card-body";
    });

    if (isLink) {
      ul.append(anchor);
    } else {
      ul.append(li);
    }
  });

  ul.querySelectorAll("img").forEach((img) =>
    img
      .closest("picture")
      .replaceWith(
        createOptimizedPicture(img.src, img.alt, false, [{ width: "750" }])
      )
  );

	languages.forEach(language => {
    const option = document.createElement('option'); // Create a new <option> element
    option.text = language; // Set the display text
    option.value = language; // Set the value (optional, could be different from text)
    languagesDropdown.add(option); // Add the option to the dropdown
  });
	
	languagesDropdown.addEventListener('change', function() {
		const selectedClass = this.value; // Get the selected value (class name)
	
		ul.querySelectorAll("a").forEach(languageRow => {
			// Check if the <li> has the selected class
			if (languageRow.classList.contains(selectedClass)) {
				languageRow.style.display = 'block'; // Show the <li>
			} else {
				languageRow.style.display = 'none'; // Hide the <li>
			}
		});
	});

  block.textContent = "";
	block.append(languagesDropdown);
  block.append(ul);
}
