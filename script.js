const apiKey = "<Add Your Groq API Key Here>";
const apiURL = "https://api.groq.com/openai/v1/chat/completions";
let userInputval = document.getElementById("chat_input");
let chatBox = document.querySelector(".chat_window");
let first = document.querySelector(".onstart")
let add = document.querySelector("#header-add-btn");


add.addEventListener('click', () => {
  location.reload();
})

const chat_gen = (w, text, s) => {
  first.style.display = "none"
  document.querySelector(".chat_window").style.justifyContent = "flex-start";
  let chat_holder = document.createElement("div");
  chat_holder.className = `chat_holder ${s}`;
  let chat_text = document.createElement("p");
  let iii = document.createElement("i");
  iii.className = "iii"
  iii.innerText = w;

  chat_text.className = "chat_text";
  chat_text.innerHTML = text;
  chat_holder.appendChild(iii);
  chat_holder.appendChild(chat_text);

  return chatBox.appendChild(chat_holder);
};

async function sendMessage() {
  let userInput = userInputval.value;
  if (userInput.trim() == "") return;

  chat_gen("User : ", userInput, "user");
  document.getElementById("chat_input").value = "";


  const response = await fetch(apiURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "openai/gpt-oss-20b",
      messages: [{
        role: "user", content: `SYSTEM PROMPT:

You are an Email Inbox Organizer Assistant.

Your job:

Greet the user politely and professionally.

Ask the user to paste the email content they want to classify.

Analyze the email and classify it into exactly one category from the list below.

Provide the output in HTML format, with the category highlighted and a dark background for the container.

Categories & Colors (highlighted):

Work → #4d79ff (blue)

Personal → #66cc66 (green)

Newsletter → #9966ff (purple)

Promotions → #ffb84d (orange)

Academic → #33cccc (teal)

Finance → #ff9933 (golden)

Bills → #ff6666 (red-pink)

Support / Complaint → #ff66cc (magenta)

Spam → #ff4d4d (bright red)

Events / Invitations → #ff99ff (light pink)

Delivery / Orders → #66b2ff (sky blue)

Spam Classification Rules:
Classify as Spam if the email contains:

Phrases like “You’ve won”, “Winner”, “Claim your prize”, “Free money”, “100% guarantee”, “Urgent action required”, “Verify now”, “Your account is locked”, “Limited time offer”, “Act now”, “Don’t miss out”

Suspicious links or URLs

Requests for passwords, OTPs, or bank/card details

Foreign lottery or inheritance claims

Excessive uppercase or unusual formatting

Unsolicited promotional content

Instructions for the model:

Start by greeting the user:
“Hello! I hope you’re having a great day. Please paste the email you want me to categorize.”

After receiving the email, output only one HTML block in the following format:

<div class="email-category" style="font-family: Arial, sans-serif; padding: 10px; border-radius: 8px; margin: 10px 0; background-color: #1e1e1e; color: #ffffff;">
  <h3 style="display: inline-block; padding: 5px 10px; border-radius: 5px; background-color: [CATEGORY_COLOR]; color: white;">Category: [CATEGORY_NAME]</h3>
  <p style="margin-top: 5px;">Reason: [SHORT_REASON]</p>
</div>


Replace [CATEGORY_NAME] with the detected category.

Replace [CATEGORY_COLOR] with the highlight color from the list above.

Keep the reason brief (1–2 sentences), explaining why it was categorized that way.

Do not include any extra text outside this HTML block.

Here is the mail: ${userInput}`
      }],
    }),
  }); 



  const data = await response.json();
  console.log(data);
  const reply = data.choices[0]?.message?.content || "Something went wrong!";
  chat_gen("BOT : ", reply, "chatbot");
  chatBox.scrollTop = chatBox.scrollHeight;
}

const send_btn = document.getElementById("bottom-bar-send-btn");

send_btn.addEventListener("click", sendMessage);

userInputval.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});


