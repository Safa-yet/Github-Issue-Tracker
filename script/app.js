let allIssueContainer = document.getElementById("allIssueContainer");
let modal = document.getElementById('infoModal');

let counter = document.getElementById("counter");

// All Issue Feact Link

let updateCounter = () => {
  counter.innerText = allIssueContainer.children.length;
};

let allIssue = async () => {
  let url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

  let res = await fetch(url);
  let data = await res.json();

  showIssue(data.data);
  console.log(data.data);
};

allIssue();

// Show Issue Into Container

let showIssue = async (data) => {
  data.forEach((info) => {
    let card = document.createElement("div");
    card.innerHTML = `
     <div class=" p-4 bg-blue-50  rounded-lg  border-t-4 ${info.status === "open" ? "border-green-500" : "border-purple-500"} space-y-2.5 h-full shadow-xl">
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
                    <p>#1 by ${info.author}</p>
                    <p>${info.createdAt}</p>
                </div>
                
            </div>
    `;
    allIssueContainer.appendChild(card);
  });
  updateCounter();
};
