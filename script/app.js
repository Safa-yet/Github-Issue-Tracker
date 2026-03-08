let allIssueContainer = document.getElementById("allIssueContainer");

let counter = document.getElementById("counter");
let allBtn = document.getElementById("allBtn");
let openBtn = document.getElementById("openBtn");
let closeBtn = document.getElementById("closeBtn");
let issueAllData = [];
let loading = document.getElementById("loading");

let search = document.getElementById("searchBox");

// All Issue Feact Link

let showLoading = () => {
  loading.classList.remove("hidden");
};
let closeLoading = () => {
  loading.classList.add("hidden");
};

let updateCounter = () => {
  counter.innerText = allIssueContainer.children.length;
};

let allIssue = async () => {
  let url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

  let res = await fetch(url);
  let data = await res.json();
  issueAllData = data.data;

  showIssue(issueAllData);
  console.log(data.data);
};

allIssue();

// Show Issue Into Container

let showIssue = async (data) => {
  allIssueContainer.innerHTML = "";
  showLoading();

  data.forEach((info) => {
    let card = document.createElement("div");
    card.innerHTML = `
     <div onClick="forModal(${info.id})" class=" p-4 bg-blue-50  rounded-lg  border-t-4 ${info.status === "open" ? "border-green-500" : "border-purple-500"} space-y-2.5 h-full shadow-xl">
                <div  class="flex justify-between items-center">
                    <img src="${info.status === "open" ? "./assets/Open-Status.png" : "./assets/Closed- Status .png"}" alt="" >
                    <button class="px-8 py-1 rounded-4xl ${info.priority === "low" ? "bg-gray-100 text-gray-500" : info.priority === "medium" ? "bg-yellow-100 text-yellow-500" : "bg-red-100 text-red-500"}">${info.priority}</button>
                </div>
                <h1 class="font-semibold text-lg">${info.title}</h1>
                <p class="text-gray-500 line-clamp-2">${info.description}</p>
                <div class="flex gap-2 flex-wrap">
                ${info.labels
                  .map((label) => {
                    let style =
                      label === "bug"
                        ? "bg-red-100 text-red-500 border-red-500"
                        : label === "help wanted"
                          ? "bg-yellow-100 text-yellow-600 border-yellow-500"
                          : label === "enhancement"
                            ? "bg-green-100 text-green-600 border-green-500"
                            : "bg-blue-100 text-blue-500 border-blue-400";

                    let icon =
                      label === "bug"
                        ? '<i class="fa-solid fa-bug"></i>'
                        : label === "help wanted"
                          ? '<i class="fa-solid fa-life-ring"></i>'
                          : label === "enhancement"
                            ? '<i class="fa-solid fa-bolt"></i>'
                            : '<i class="fa-brands fa-accusoft"></i>';
                    return `<button class="px-2 py-1 rounded-4xl border ${style}">${icon} ${label}</button>`;
                  })
                  .join("")}
                </div>
                <div class="text-gray-500 border-t border-gray-300 pt-2.5">
                    <p>#${info.id} by ${info.author}</p>
                    <p>${new Date(info.createdAt).toLocaleString()}</p>
                </div>
                
            </div>
    `;
    allIssueContainer.appendChild(card);
  });
  closeLoading();
  updateCounter();
};

let forModal = async (id) => {
  url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
  let res = await fetch(url);
  let data = await res.json();
  console.log(data);
  showInfoModal(data.data);
};

let showInfoModal = (data) => {
  console.log(data.id);
  let modalContainer = document.getElementById("modalContainer");
  modalContainer.innerHTML = `
<dialog id="infoModal" class="modal">
  <div class="modal-box w-11/12 space-y-2.5  ${data.status === "open" ? "shadow-xl shadow-green-900" : "shadow-xl shadow-purple-900"}">
    <h3 class=" font-bold text-xl">${data.title}</h3>
    <div>

      <span class="rounded-4xl ${data.status === "open" ? "bg-green-500" : "bg-purple-500"} bg-green-500 text-white py-1 px-3">${data.status}</span> 
      <span class="text-xs text-gray-500">● Opened by ${data.author} ● ${new Date(data.createdAt).toLocaleString()}</span>
    </div>
    <div class="flex gap-2 flex-wrap">
                ${data.labels
                  .map((label) => {
                    let style =
                      label === "bug"
                        ? "bg-red-100 text-red-500 border-red-500"
                        : label === "help wanted"
                          ? "bg-yellow-100 text-yellow-600 border-yellow-500"
                          : label === "enhancement"
                            ? "bg-green-100 text-green-600 border-green-500"
                            : "bg-blue-100 text-blue-500 border-blue-400";

                    let icon =
                      label === "bug"
                        ? '<i class="fa-solid fa-bug"></i>'
                        : label === "help wanted"
                          ? '<i class="fa-solid fa-life-ring"></i>'
                          : label === "enhancement"
                            ? '<i class="fa-solid fa-bolt"></i>'
                            : '<i class="fa-brands fa-accusoft"></i>';
                    return `<button class="px-2 py-1 rounded-4xl border ${style}">${icon} ${label}</button>`;
                  })
                  .join("")}
                </div>
    <p class="py-4 text-gray-500">${data.description}</p>
    <div class="flex justify-between items-center">
      <div>
        <p class="text-gray-500">Assignee:</p>
        <p>${data.assignee ? data.assignee : "Not Mention"}</p>
      </div>
      <div class="text-start w-1/2">
        <p>Priority</p>
                    <button class="px-8 py-1 rounded-4xl ${data.priority === "low" ? "bg-gray-100 text-gray-500" : data.priority === "medium" ? "bg-yellow-100 text-yellow-500" : "bg-red-100 text-red-500"}">${data.priority}</button>


      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button, it will close the modal -->
        <button class="btn btn-primary">Close</button>
      </form>
    </div>
  </div>
</dialog>

`;

  document.getElementById("infoModal").showModal();
};

let filterIssue = (status) => {
  showLoading();

  setTimeout(() => {
    if (status === "all") {
      showIssue(issueAllData);
    } else if (status === "open") {
      let filteredOpen = issueAllData.filter(
        (issue) => issue.status === "open",
      );
      showIssue(filteredOpen);
    } else if (status === "closed") {
      let filterClosed = issueAllData.filter(
        (issue) => issue.status === "closed",
      );
      showIssue(filterClosed);
    }
  }, 500);
};
let showActiveBtn = (id) => {
  allBtn.classList.remove("btn-primary");
  closeBtn.classList.remove("btn-primary");
  openBtn.classList.remove("btn-primary");
  let select = document.getElementById(id);
  select.classList.add("btn-primary");
};

search.addEventListener("keyup", async () => {
  showLoading();
  let searchValue = search.value.trim().toLowerCase();
  console.log(searchValue);
  url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`;
  let res = await fetch(url);
  let data = await res.json();

  let allData = data.data;
  let filterData = allData.filter((word) =>
    word.title.toLowerCase().includes(searchValue),
  );
  showIssue(filterData);
});
