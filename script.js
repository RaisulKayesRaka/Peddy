let fetchedPets = [];

function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("hidden");
}

function fetchCategories() {
    fetch("https://openapi.programming-hero.com/api/peddy/categories")
        .then((res) => res.json())
        .then((data) => displayCategories(data.categories));
}

function removeActiveBtn() {
    const activeBtn = document.getElementsByClassName("category-btn");
    for (let btn of activeBtn) {
        btn.classList.remove(
            "bg-[#0E7A811A]",
            "border-2",
            "border-[#0E7A81]",
            "rounded-full",
        );
        btn.classList.add("rounded-2xl", "border", "border-[#0E7A81261]");
    }
}

function fetchPetsByCategory(category) {
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
        .then((res) => res.json())
        .then((data) => {
            removeActiveBtn();

            const activeBtn = document.getElementById(`btn-${category}`);
            activeBtn.classList.remove(
                "rounded-2xl",
                "border",
                "border-[#0E7A81261]",
            );
            activeBtn.classList.add(
                "bg-[#0E7A811A]",
                "border-2",
                "border-[#0E7A81]",
                "rounded-full",
            );

            displayAllPets(data.data);
            fetchedPets = data.data;
        });
}

function displayCategories(categories) {
    categories.map((category) => {
        const buttonContainer = document.createElement("div");
        buttonContainer.innerHTML = `
            <button id="btn-${category.category}" onclick="fetchPetsByCategory('${category.category}')"
                    class="category-btn flex w-full cursor-pointer items-center justify-center gap-4 rounded-2xl border border-[#0E7A81261] p-4 md:p-5 lg:p-6 hover:bg-[#0E7A811A] transform active:scale-90 transition duration-150 ease-in-out">
                    <img src="${category.category_icon}" alt=""
                        class="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-14 lg:w-14" />
                    <span class="text-lg font-bold md:text-xl lg:text-2xl">${category.category}</span>
                </button>
        `;
        document.getElementById("categories").appendChild(buttonContainer);
    });
}

function fetchAllPets() {
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
        .then((res) => res.json())
        .then((data) => {
            displayAllPets(data.pets);
            fetchedPets = data.pets;
        });
}

function addToLiked(petId) {
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
        .then((res) => res.json())
        .then((data) => {
            liked = document.getElementById("liked");
            div = document.createElement("div");
            div.classList.add("aspect-square");
            div.innerHTML = `<img src="${data.petData.image}" alt="" class="w-full h-full object-cover rounded-lg"/>`;
            liked.appendChild(div);
        });
}

function displayDetails(petId) {
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
        .then((res) => res.json())
        .then((data) => {
            const div = document.createElement("div");
            div.classList.add(
                "flex",
                "items-center",
                "justify-center",
                "w-full",
                "h-full",
            );
            div.innerHTML = `
                <div
                    class="mx-auto w-11/12 max-w-screen-sm p-8 bg-white rounded-xl max-h-[90vh] overflow-y-auto overscroll-none">
                    <img src="${data.petData.image
                }" alt="" class="h-48 sm:h-64 md:h-80 w-full rounded-lg mb-6 object-cover">
                    <h4 class="text-xl font-bold text-[#131313] lg:text-2xl mb-4">
                        ${data.petData.pet_name}
                    </h4>
                    <div class="space-y-1 grid md:grid-cols-2">
                        <div class="flex items-center gap-2">
                            <img src="./images/breed.svg" alt="" />
                            <p class="text-[#131313B2]">
                                Breed: <span>${data.petData.breed
                    ? data.petData.breed
                    : "Unknown"
                }</span>
                            </p>
                        </div>
                        <div class="flex items-center gap-2">
                            <img src="./images/birth.svg" alt="" />
                            <p class="text-[#131313B2]">Birth: <span>${data.petData.date_of_birth
                    ? data.petData.date_of_birth
                    : "Unknown"
                }</span></p>
                        </div>
                        <div class="flex items-center gap-2">
                            <img src="./images/gender.svg" alt="" />
                            <p class="text-[#131313B2]">Gender: <span>${data.petData.gender
                    ? data.petData.gender
                    : "Unknown"
                }</span></p>
                        </div>
                        <div class="flex items-center gap-2">
                            <img src="./images/price.svg" alt="" />
                            <p class="text-[#131313B2]">Price: <span>${data.petData.price ? data.petData.price : 0
                }</span>$</p>
                        </div>
                        <div class="flex items-center gap-2">
                            <img src="./images/vaccine.png" alt="" class="w-5 h-5" />
                            <p class="text-[#131313B2]">Vaccinated status: <span>${data.petData.vaccinated_status
                    ? data.petData.vaccinated_status
                    : "Unknown"
                }</span></p>
                        </div>
                    </div>
                    <hr class="my-4">
                    <div>
                        <h4 class="font-semibold text-[#131313] mb-3">Detail Information</h4>
                        <p class="text-[#131313B2] mb-4">${data.petData.pet_details
                }</p>
                    </div>
                    <div>
                        <button onclick="closeModal()"
                            class="rounded-lg border border-[#0E7A81] px-4 py-2 font-bold text-[#0E7A81] bg-[#0E7A811A] w-full">Cancel</button>
                    </div>
                </div>
            `;
            document.getElementById("modal").classList.remove("hidden");
            document.getElementById("modal").innerHTML = "";
            document.getElementById("modal").appendChild(div);
        });
}

function closeModal() {
    document.getElementById("modal").classList.add("hidden");
}

function adoptPet(petId) {
    document.getElementById("timeModal").classList.remove("hidden");
    let count = 3;
    document.getElementById("countdown").innerText = count;
    const x = setInterval(() => {
        count = count - 1;
        document.getElementById("countdown").innerText = count;
        if (count === 0) {
            clearInterval(x);
            document.getElementById("timeModal").classList.add("hidden");
            document.getElementById(`adopt-${petId}`).innerText = "Adopted";
            document
                .getElementById(`adopt-${petId}`)
                .classList.add("bg-gray-100", "text-gray-500");
            document
                .getElementById(`adopt-${petId}`)
                .classList.remove("hover:bg-[#0E7A8126]", "border");
            document.getElementById(`adopt-${petId}`).setAttribute("disabled", true);
        }
    }, 1000);
}

function displayAllPets(pets) {
    document.getElementById("pets").innerHTML = "";

    document.getElementById("pets-container").classList.add("hidden");
    document.getElementById("loading").classList.remove("hidden");
    setTimeout(() => {
        document.getElementById("loading").classList.add("hidden");
        document.getElementById("pets-container").classList.remove("hidden");

        document
            .getElementById("pets")
            .parentElement.classList.remove(
                "border",
                "rounded-xl",
                "p-5",
                "bg-[#F8F8F8]",
            );

        if (pets.length === 0) {
            document
                .getElementById("pets")
                .parentElement.classList.add(
                    "border",
                    "rounded-xl",
                    "p-5",
                    "bg-[#F8F8F8]",
                );

            document.getElementById("pets").innerHTML = `
            <div class="col-span-1 md:col-span-2 lg:col-span-3">
                <div class="p-4 md:p-12 lg:p-24">
                    <img src="./images/error.svg" alt="" class="w-20 md:w-32 lg:w-40 mx-auto mb-6" />
                    <h3 class="mb-4 text-center text-xl font-bold text-[#131313] md:text-2xl lg:text-3xl">No Information Available</h3>
                    <p class="text-center max-w-screen-sm mx-auto text-[#131313B2]">Sorry! There are no pets available of this category at the moment. Please try searching another category or try again later. Thanks for your patience.</p>
                </div>
            </div>
        `;
            return;
        }
        pets.map((pet) => {
            const div = document.createElement("div");
            div.classList.add("rounded-xl", "border", "p-5");

            div.innerHTML = `
            <div class="mb-4">
                                <img src="${pet.image
                }" alt="" class="h-40 w-full rounded-lg object-cover" />
                            </div>
                            <div class="space-y-2">
                                <h4 class="text-lg font-bold text-[#131313] lg:text-xl">
                                    ${pet.pet_name}
                                </h4>
                                <div class="flex items-center gap-2">
                                    <img src="./images/breed.svg" alt="" />
                                    <p class="text-[#131313B2] text-ellipsis whitespace-nowrap overflow-hidden" title="${pet.breed ? pet.breed : ""
                }">
                                        Breed: <span>${pet.breed ? pet.breed : "Unknown"
                }</span>
                                    </p>
                                </div>
                                <div class="flex items-center gap-2">
                                    <img src="./images/birth.svg" alt="" />
                                    <p class="text-[#131313B2]">Birth: <span>${pet.date_of_birth
                    ? pet.date_of_birth
                    : "Unknown"
                }</span></p>
                                </div>
                                <div class="flex items-center gap-2">
                                    <img src="./images/gender.svg" alt="" />
                                    <p class="text-[#131313B2]">Gender: <span>${pet.gender ? pet.gender : "Unknown"
                }</span></p>
                                </div>
                                <div class="flex items-center gap-2">
                                    <img src="./images/price.svg" alt="" />
                                    <p class="text-[#131313B2]">Price: <span>${pet.price ? pet.price : 0
                }</span>$</p>
                                </div>
                            </div>
                            <hr class="my-4" />
                            <div class="flex flex-wrap items-center justify-between gap-4">
                                <button onclick="addToLiked(${pet.petId
                })" class="rounded-lg border border-[#0E7A8126] px-4 py-2 hover:bg-[#0E7A8126] transform active:scale-95 transition duration-150 ease-in-out">
                                    <img src="./images/like.svg" alt="" class="" />
                                </button>
                                <button onclick="adoptPet(${pet.petId
                })" id="adopt-${pet.petId}"
                                    class="flex-1 rounded-lg border border-[#0E7A8126] px-4 py-2 font-bold text-[#0E7A81] hover:bg-[#0E7A8126] transform active:scale-95 transition duration-150 ease-in-out">
                                    Adopt
                                </button>
                                <button onclick="displayDetails(${pet.petId})"
                                    class="flex-1 rounded-lg border border-[#0E7A8126] px-4 py-2 font-bold text-[#0E7A81] hover:bg-[#0E7A8126] transform active:scale-95 transition duration-150 ease-in-out">
                                    Details
                                </button>
                            </div>
        `;

            document.getElementById("pets").appendChild(div);
        });
    }, 2000);
}

function sortByPrice() {
    let sortedPets = fetchedPets.sort((a, b) => b.price - a.price);
    displayAllPets(sortedPets);
}

fetchAllPets();
fetchCategories();
