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
        btn.classList.remove("bg-[#0E7A811A]", "border-2", "border-[#0E7A81]", "rounded-full");
        btn.classList.add("rounded-2xl", "border", "border-[#0E7A81261]");
    }
}

function fetchPetsByCategory(category) {
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
        .then((res) => res.json())
        .then((data) => {

            removeActiveBtn();

            const activeBtn = document.getElementById(`btn-${category}`);
            activeBtn.classList.remove("rounded-2xl", "border", "border-[#0E7A81261]");
            activeBtn.classList.add("bg-[#0E7A811A]", "border-2", "border-[#0E7A81]", "rounded-full");
            displayAllPets(data.data);
        });
}

function displayCategories(categories) {
    categories.map((category) => {
        buttonContainer = document.createElement("div");
        buttonContainer.innerHTML = `
            <button id="btn-${category.category}" onclick="fetchPetsByCategory('${category.category}')"
                    class="category-btn flex w-full cursor-pointer items-center justify-center gap-4 rounded-2xl border border-[#0E7A81261] p-4 md:p-5 lg:p-6">
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
        .then((data) => displayAllPets(data.pets));
}

function displayAllPets(pets) {
    document.getElementById("pets").innerHTML = "";

    document
        .getElementById("pets")
        .parentElement.classList.remove(
            "border",
            "rounded-xl",
            "p-5",
            "bg-[#F8F8F8]"
        );

    if (pets.length === 0) {
        document
            .getElementById("pets")
            .parentElement.classList.add(
                "border",
                "rounded-xl",
                "p-5",
                "bg-[#F8F8F8]"
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
        div = document.createElement("div");
        div.classList.add("rounded-xl", "border", "p-5");

        div.innerHTML = `
            <div class="mb-4">
                                <img src="${pet.image}" alt="" class="h-40 w-full rounded-lg object-cover" />
                            </div>
                            <div class="space-y-2">
                                <h4 class="text-lg font-bold text-[#131313] lg:text-xl">
                                    ${pet.pet_name}
                                </h4>
                                <div class="flex items-center gap-2">
                                    <img src="./images/breed.svg" alt="" />
                                    <p class="text-[#131313B2]">
                                        Breed: <span>${pet.breed? pet.breed : "Unknown"}</span>
                                    </p>
                                </div>
                                <div class="flex items-center gap-2">
                                    <img src="./images/birth.svg" alt="" />
                                    <p class="text-[#131313B2]">Birth: <span>${pet.date_of_birth? pet.date_of_birth : "Unknown"}</span></p>
                                </div>
                                <div class="flex items-center gap-2">
                                    <img src="./images/gender.svg" alt="" />
                                    <p class="text-[#131313B2]">Gender: <span>${pet.gender? pet.gender : "Unknown"}</span></p>
                                </div>
                                <div class="flex items-center gap-2">
                                    <img src="./images/price.svg" alt="" />
                                    <p class="text-[#131313B2]">Price: <span>${pet.price? pet.price : 0}</span>$</p>
                                </div>
                            </div>
                            <hr class="my-4" />
                            <div class="flex flex-wrap items-center justify-between gap-4">
                                <button class="rounded-lg border border-[#0E7A8126] px-4 py-2">
                                    <img src="./images/like.svg" alt="" class="" />
                                </button>
                                <button
                                    class="flex-1 rounded-lg border border-[#0E7A8126] px-4 py-2 font-bold text-[#0E7A81]">
                                    Adopt
                                </button>
                                <button
                                    class="flex-1 rounded-lg border border-[#0E7A8126] px-4 py-2 font-bold text-[#0E7A81]">
                                    Details
                                </button>
                            </div>
        `;

        document.getElementById("pets").appendChild(div);
    });
}

fetchAllPets();
fetchCategories();
