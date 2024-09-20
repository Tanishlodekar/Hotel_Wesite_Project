// Initialize the map
var map = L.map("map").setView([19.237787, 73.129467], 8);

// Set up the Esri World Imagery tile layer for satellite view
L.tileLayer(
    "https://{s}.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    {
        // attribution:
        //   "Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012",
        maxZoom: 18,
        minZoom: 8,
        subdomains: ["server", "services"],
    }
).addTo(map);

// Marker data with additional information
var locations = [
    {
        lat: 19.237787,
        lng: 73.129467,
        title: "",
        images: [
            "images/image1.jpeg",
            "images/image2.jpeg",
            "images/image9.jpeg",
            "images/image10.jpeg",
            "images/image11.jpeg",
        ],
        description: "",
    },
    {
        lat: 18.502521399512744,
        lng: 73.87719086671154,
        title: "",
        images: ["images/image3.jpeg", "images/image4.jpeg"],
        description: "",
    },
    {
        lat: 18.623490319672438,
        lng: 73.80780421947355,
        title: "",
        images: [
            "images/image5.jpeg",
            "images/image6.jpeg",
            "images/image12.jpeg",
            "images/image13.jpeg",
        ],
        description: "",
    },
];

// Add markers to the map with click event
locations.forEach(function (location) {
    var marker = L.marker([location.lat, location.lng]).addTo(map);
    marker.on("click", function () {
        showInfoPanel(location);
    });
});
// Function to display the information in the bottom panel
function showInfoPanel(location) {
    document.getElementById("panel-title").innerText = location.title;
    document.getElementById("panel-description").innerText =
        location.description;

    // Clear previous images
    var imageContainer = document.getElementById("image-container");
    imageContainer.innerHTML = "";

    // Add new images
    location.images.forEach(function (imageUrl) {
        var img = document.createElement("img");
        img.src = imageUrl;
        imageContainer.appendChild(img);
    });

    document.getElementById("info-panel").style.display = "block";

    // Start auto-slide
    startAutoSlide();
}

// Auto-slide function
var currentIndex = 0;
function startAutoSlide() {
    var imageContainer = document.getElementById("image-container");
    var images = imageContainer.querySelectorAll("img");
    var totalImages = images.length;

    if (totalImages <= 1) return;

    function slide() {
        currentIndex = (currentIndex + 1) % totalImages;
        var offset = currentIndex * -300; // Assuming each image is 100px wide
        imageContainer.style.transform = "translateX(" + offset + "px)";
    }

    // Clear any previous intervals
    if (window.autoSlideInterval) {
        clearInterval(window.autoSlideInterval);
    }

    window.autoSlideInterval = setInterval(slide, 1000); // Slide every 3 seconds
}
// Collapse/Expand functionality
var isCollapsed = false;
document
    .getElementById("collapse-button")
    .addEventListener("click", function () {
        var panel = document.getElementById("info-panel");
        if (isCollapsed) {
            panel.style.height = "auto";
            this.innerText = "Collapse";
        } else {
            panel.style.height = "40px";
            this.innerText = "Expand";
        }
        isCollapsed = !isCollapsed;
    });

// Optional: Close panel when clicking on the map (if not collapsed)
map.on("click", function () {
    if (!isCollapsed) {
        document.getElementById("info-panel").style.display = "none";
    }
});
