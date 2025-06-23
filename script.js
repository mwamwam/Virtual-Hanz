document.addEventListener("DOMContentLoaded", function() {
  let bottom = document.querySelector(".bottom");
  let input = document.querySelector("#txt");
  let sendbtn = document.querySelector(".uil-message");
  let ul = document.querySelector("#list_cont");
  
  bottom.addEventListener("click", () => input.focus());
  
  input.addEventListener("input", () => {
    sendbtn.style.background = input.value.length > 0 ? "#11ba91" : "transparent";
  });
  
  function Hanz() {
    if (input.value.trim() !== "") {
      sendbtn.style.background = "transparent";
      
      let typingAnimationDiv = document.createElement("div");
      typingAnimationDiv.className = "typing-animation";
      for (let i = 0; i < 3; i++) {
        let dotSpan = document.createElement("span");
        dotSpan.className = "dot";
        typingAnimationDiv.appendChild(dotSpan);
      }
      
      let li2 = document.createElement("li");
      li2.className = "rchat";
      li2.appendChild(typingAnimationDiv);
      
      let li = document.createElement("li");
      li.className = "schat";
      li.textContent = input.value;
      ul.appendChild(li);
      
      setTimeout(() => {
        ul.appendChild(li2);
        document.querySelector('.msgs_cont').scrollTop = document.querySelector('.msgs_cont').scrollHeight;
      }, 500);
      
      sendbtn.disabled = true;
      document.querySelector('.msgs_cont').scrollTop = document.querySelector('.msgs_cont').scrollHeight;
      fetch("https://hanz-server.onrender.com/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ message: input.value })
        })
        .then(res => res.json())
        .then(data => {
          let reply = data.reply?.trim() || "Oops! Walang sagot si Hanz, Langga.";
          li2.textContent = "";
          let i = 0;
          const intervalId = setInterval(() => {
            if (i < reply.length) {
              li2.textContent += reply[i];
              document.querySelector('.msgs_cont').scrollTop = document.querySelector('.msgs_cont').scrollHeight;
              i++;
            } else {
              clearInterval(intervalId);
              sendbtn.disabled = false;
            }
          }, 20);
        })
        .catch(() => {
          li2.textContent = "Oops! May problema ata 😓";
          sendbtn.disabled = false;
        });
      
      input.value = "";
    }
  }
  
  sendbtn.addEventListener("click", Hanz);
});

(function() {
  const encodedIconURL = "aHR0cHM6Ly9pLmliYi5jby9OZzRzSjJxUS9JTUctODc1NS5qcGc=";
  const encodedName = "SGFueg==";
  const encodedFooter = "bWFkZSBieSBIYW56";
  
  function decode(str) {
    return atob(str);
  }
  
  function checkIntegrity() {
    try {
      const icon = document.querySelector(".icon");
      const name = document.querySelector(".name");
      const footerText = window.getComputedStyle(document.querySelector('.bottom'), '::after').getPropertyValue('content').replace(/['"]/g, '');
      const bgImage = window.getComputedStyle(icon).backgroundImage;
      
      if (!bgImage.includes(decode(encodedIconURL)) || name.textContent.trim() !== decode(encodedName) || footerText !== decode(encodedFooter)) {
        document.body.innerHTML = "";
      }
    } catch (e) {
      document.body.innerHTML = "";
    }
  }
  
  setTimeout(checkIntegrity, 500);
})();