document.addEventListener('DOMContentLoaded', () => {
    const minPrice = document.getElementById('minPrice');
    const maxPrice = document.getElementById('maxPrice');
    const sliderTrack = document.getElementById('sliderTrack');
    const minTooltip = document.getElementById('minTooltip');
    const maxTooltip = document.getElementById('maxTooltip');
    const minPriceLabel = document.getElementById('minPriceLabel');
    const maxPriceLabel = document.getElementById('maxPriceLabel');

    function updateSlider() {
        let minValue = parseInt(minPrice.value, 10);
        let maxValue = parseInt(maxPrice.value, 10);

        if (minValue >= maxValue) {
            minValue = maxValue - 10;
            minPrice.value = minValue;
        }
        if (maxValue <= minValue) {
            maxValue = minValue + 10;
            maxPrice.value = maxValue;
        }

        const minPercent = (minValue / maxPrice.max) * 100;
        const maxPercent = (maxValue / maxPrice.max) * 100;

        sliderTrack.style.left = `${minPercent}%`;
        sliderTrack.style.width = `${maxPercent - minPercent}%`;

        minTooltip.textContent = `₹${minValue}`;
        maxTooltip.textContent = `₹${maxValue}`;
        minTooltip.style.left = `${minPercent}%`;
        maxTooltip.style.left = `${maxPercent}%`;

        minPriceLabel.textContent = `₹${minValue}`;
        maxPriceLabel.textContent = `₹${maxValue}`;

        minTooltip.style.opacity = '1';
        maxTooltip.style.opacity = '1';
    }

    function setMinPrice(value) {
        minPrice.value = value;
        updateSlider();
    }

    function setMaxPrice(value) {
        maxPrice.value = value;
        updateSlider();
    }

    if (minPrice && maxPrice) {
        minPrice.addEventListener('input', updateSlider);
        maxPrice.addEventListener('input', updateSlider);

        sliderTrack.addEventListener('click', (event) => {
            const rect = sliderTrack.getBoundingClientRect();
            const offsetX = event.clientX - rect.left;
            const totalWidth = rect.width;
            const percentage = offsetX / totalWidth;

            const newMinValue = Math.round(percentage * maxPrice.max);
            const newMaxValue = Math.round(maxPrice.value);

            if (newMinValue < newMaxValue) {
                setMinPrice(newMinValue);
            } else {
                setMaxPrice(newMinValue);
            }
        });

        const hideTooltip = (tooltip) => tooltip.style.opacity = '0';

        minPrice.addEventListener('mouseup', () => hideTooltip(minTooltip));
        maxPrice.addEventListener('mouseup', () => hideTooltip(maxTooltip));
        minPrice.addEventListener('touchend', () => hideTooltip(minTooltip));
        maxPrice.addEventListener('touchend', () => hideTooltip(maxTooltip));

        updateSlider();
    }

    const colors = document.querySelectorAll('.color');
    const products = document.querySelectorAll('.product-card');

    colors.forEach(color => {
        color.addEventListener('click', function() {
            const selectedColor = this.getAttribute('data-color');
            const isSelected = this.classList.toggle('selected');

            products.forEach(product => {
                const productColors = product.getAttribute('data-colors') ? product.getAttribute('data-colors').split(',') : [];

                if (isSelected) {
                    product.style.display = productColors.includes(selectedColor) ? '' : 'none';
                } else {
                    const anySelected = Array.from(colors).some(color => color.classList.contains('selected'));
                    product.style.display = anySelected ? productColors.some(color => colors.find(c => c.getAttribute('data-color') === color && c.classList.contains('selected'))) ? '' : 'none' : '';
                }
            });
        });
    });

    const clearButton = document.querySelector('.filters-header button');
    const selectElements = document.querySelectorAll('.filters select');
    const sizeItems = document.querySelectorAll('.slider-item');
    const colorOptions = document.querySelectorAll('.color-options .color');
    const checkboxes = document.querySelectorAll('.filters input[type="checkbox"]');
    const textInputs = document.querySelectorAll('.filters input[type="text"]');

    if (clearButton) {
        clearButton.addEventListener('click', function() {
            selectElements.forEach(select => select.selectedIndex = 0);

            sizeItems.forEach(item => item.classList.remove('active'));

            colorOptions.forEach(color => color.classList.remove('selected'));

            checkboxes.forEach(checkbox => checkbox.checked = false);

            textInputs.forEach(input => input.value = '');

            document.querySelectorAll('.selected-options span').forEach(span => {
                span.textContent = 'None';
            });

        });
    }

    const gridViewButton = document.getElementById('gridViewButton');
    const listViewButton = document.getElementById('listViewButton');
    const productGrid = document.querySelector('.product-grid');
    const productCards = document.querySelectorAll('.product-card');

    if (gridViewButton && listViewButton) {
        gridViewButton.addEventListener('click', function() {
            productGrid.classList.remove('list-view');
            productCards.forEach(card => card.classList.remove('list-view'));
        });

        listViewButton.addEventListener('click', function() {
            productGrid.classList.add('list-view');
            productCards.forEach(card => card.classList.add('list-view'));
        });
    }

    const downloadButton = document.querySelector('.actions button.download');

    if (downloadButton) {
        downloadButton.addEventListener('click', function() {
            const visibleProducts = Array.from(products).filter(product => product.style.display !== 'none');
            const productData = visibleProducts.map(product => ({
                name: product.querySelector('h4').textContent,
                brand: product.querySelector('.brand').textContent,
                price: product.querySelector('.price').textContent,
            }));

            const blob = new Blob([JSON.stringify(productData, null, 2)], {
                type: 'application/json'
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'products.json';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });
    }
    const toggleFilters = document.getElementById('toggleFilters');
    const filtersDiv = document.getElementById('filterContainer');
    const filterContainer = document.getElementById('filterContainer');
    const eyeIcon = document.getElementById('eyeIcon');
    const xIcon = document.getElementById('xIcon');
    const productSection = document.querySelector('.product-section');

    toggleFilters.addEventListener('click', function() {
        const isHidden = filtersDiv.style.display === 'none' || filtersDiv.style.display === '';
        filtersDiv.style.display = isHidden ? 'block' : 'none';

        if (isHidden) {
            filterContainer.style.width = '1%';
            xIcon.style.display = 'block';
        } else {
            filterContainer.style.width = '';
            xIcon.style.display = 'none';
            eyeIcon.style.display = 'block';
            eyeIcon.style.zIndex = '99999';
            eyeIcon.style.position = 'absolute';
        }
        productSection.classList.toggle('flex-1', !isHidden);
        productSection.classList.toggle('w-full', isHidden);
    });

    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    const dropdownMenus = document.querySelectorAll('.dropdown-menu');

    dropdownToggles.forEach((toggle, index) => {
        toggle.addEventListener('click', (event) => {
            event.stopPropagation();
            dropdownMenus[index].classList.toggle('hidden');
        });
    });

    document.addEventListener('click', () => {
        dropdownMenus.forEach(menu => menu.classList.add('hidden'));
    });

    const updateSelectedOptions = (dropdown, selectedTextElement) => {
        const selectedOptions = Array.from(dropdown.querySelectorAll('input[type="checkbox"]:checked'))
            .map(checkbox => checkbox.parentElement.textContent.trim());
        selectedTextElement.textContent = selectedOptions.length > 0 ? selectedOptions.join(', ') : 'None';
    };

    document.querySelectorAll('.multiselect-dropdown').forEach(dropdown => {
        const selectedTextElement = dropdown.nextElementSibling.querySelector('.selected-options span');
        dropdown.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                updateSelectedOptions(dropdown, selectedTextElement);
            });
        });
    });

    sizeItems.forEach(item => {
        item.addEventListener('click', function() {
            sizeItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });

    const searchInput = document.getElementById('productSearch');
    const searchButton = document.getElementById('searchButton');

    function filterProducts() {
        const query = searchInput.value.toLowerCase();
        products.forEach(product => {
            const productName = product.querySelector('h4').textContent.toLowerCase();
            const productBrand = product.querySelector('.brand').textContent.toLowerCase();
            product.style.display = (productName.includes(query) || productBrand.includes(query)) ? '' : 'none';
        });
    }

    searchInput.addEventListener('input', filterProducts);
    searchButton.addEventListener('click', filterProducts);

    eyeIcon.addEventListener('click', function() {
        const isVisible = filterContainer.style.display === 'block';

        if (!isVisible) {
            filterContainer.style.display = 'block';
            filterContainer.style.width = '35%';
            eyeIcon.classList.remove('fa-eye');
            eyeIcon.classList.add('fa-times');
        } else {
            filterContainer.style.display = 'none';
            eyeIcon.classList.remove('fa-times');
            eyeIcon.classList.add('fa-eye');
        }

        xIcon.style.display = isVisible ? 'none' : 'block';
    });

    document.addEventListener('DOMContentLoaded', function() {
        const isFiltersVisible = filtersDiv.style.display !== 'none' && filtersDiv.style.display !== '';
        eyeIcon.style.display = isFiltersVisible ? 'none' : 'block';
    });

    xIcon.addEventListener('click', function() {
        filtersDiv.style.display = 'none';
        eyeIcon.style.display = 'block';
        xIcon.style.display = 'none';
        productSection.classList.add('w-full');
        productSection.classList.remove('flex-1');
    });
});
let currentPage = 1;
let resultsPerPage = 8;

function initializePagination() {
    currentPage = 1;
    const paginationButtons = document.querySelectorAll('.pn');
    paginationButtons.forEach((button) => {
        button.classList.remove('bg-[var(--primary-color)]', 'text-white');
        button.classList.add('bg-red-100', 'text-red-500');

        if (button.textContent.trim() === "1") {
            button.classList.add('bg-[var(--primary-color)]', 'text-white');
        } else {
            button.classList.add('text-black');
        }
    });
}

function changePage(page) {
    currentPage = page;
    console.log(`Displaying page ${currentPage} with ${resultsPerPage} results per page.`);

    const paginationButtons = document.querySelectorAll('.pn');
    paginationButtons.forEach((button) => {
        button.classList.remove('bg-[var(--primary-color)]', 'text-white');
        button.classList.add('bg-red-100', 'text-red-500');

        if (button.textContent.trim() === String(currentPage)) {
            button.classList.add('bg-[var(--primary-color)]', 'text-white');
        } else {
            button.classList.add('text-black');
        }
    });
}

document.addEventListener('DOMContentLoaded', initializePagination);

function updateResultsPerPage() {
    const select = document.getElementById('resultsPerPage');
    resultsPerPage = parseInt(select.value);
    console.log(`Results per page updated to ${resultsPerPage}.`);
}

function resetFilterButtonStyles() {
    const filterButtons = document.querySelectorAll('.filter-button');
    filterButtons.forEach(button => {
        button.classList.remove('bg-[var(--primary-color)]', 'text-white');
        button.classList.add('bg-[var(--primary-color)]', 'text-white-500');
    });
}

function toggleFilters() {
    const filterContainer = document.getElementById('filterContainer');
    const eyeIcon = document.getElementById('eyeIcon');

    if (filterContainer.style.display === 'none' || filterContainer.style.display === '') {
        filterContainer.style.display = 'block'; // Expand the filters
        eyeIcon.classList.remove('fa-eye'); // Change icon to X
        eyeIcon.classList.add('fa-times');
    } else {
        filterContainer.style.display = 'none'; // Collapse the filters
        eyeIcon.classList.remove('fa-times'); // Change icon back to eye
        eyeIcon.classList.add('fa-eye');
    }
}