function extractImageLinks(html: string): string[] {
    const imageRegex = /<img[^>]*src=["']([^"']+)["']/gi;
    const matches = [...html.matchAll(imageRegex)];
    return matches.map(match => match[1]);
}

const extractButton = document.getElementById("extractBtn");
const textarea = document.getElementById("htmlInput") as HTMLTextAreaElement;
const outputContainer = document.getElementById("imageResults");

if (extractButton && textarea && outputContainer) {
    extractButton.addEventListener("click", () => {
        const html = textarea.value;
        const imageLinks = extractImageLinks(html);

        outputContainer.innerHTML = "";

        imageLinks.forEach((src) => {
            const container = document.createElement("div");
            container.className = "image-container";

            const img = document.createElement("img");
            img.src = src;
            img.alt = "Imagen extraída";

            container.appendChild(img);
            outputContainer.appendChild(container);
        });
    });
}
