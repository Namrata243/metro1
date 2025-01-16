let currentImageIndex = 0;
const images = [
    'https://placehold.co/300x300',
    'https://placehold.co/300x300/ff0000/ffffff',
    'https://placehold.co/300x300/ff00ff/ffffff',
    'https://placehold.co/300x300/ffff00/ffffff',
    'https://placehold.co/300x300/ff69b4/ffffff',
    'https://placehold.co/300x300/00bfff/ffffff'
];

function changeImage(direction) {
    currentImageIndex = (currentImageIndex + direction + images.length) % images.length;
    document.getElementById('productImage').src = images[currentImageIndex];
}

function changeColor(imageUrl) {
    document.getElementById('productImage').src = imageUrl;
}

function toggleShowroomTable() {
    const showroomTableContainer = document.getElementById('showroomTableContainer');
    const isExpanded = showroomTableContainer.style.maxHeight === 'none';

    showroomTableContainer.style.maxHeight = isExpanded ? '100%' : 'none';

    const otherTables = document.querySelectorAll('.product-section .table-container:not(#showroomTableContainer)');
    otherTables.forEach(table => {
        table.style.display = isExpanded ? 'block' : 'none';
    });

    const toggleButton = document.getElementById('toggleShowroomButton');
    toggleButton.textContent = isExpanded ? 'Click Here to Expand' : 'Collapse Table';
}