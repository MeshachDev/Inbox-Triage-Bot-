# Inbox Triage Bot

Smart Email Categorization with HTML Highlights

Inbox Triage Bot is an intelligent email-processing system that takes raw email text as input and automatically classifies it into well-defined categories. It returns HTML-formatted output with distinct background colors for each category, making it perfect for inbox dashboards, automation pipelines, and UI rendering.

## Features

AI-powered categorization across multiple real-world email types.

HTML-ready output for direct use with .innerHTML.

Unique dark-tone category highlights using clean, readable color palettes.

Reasoning included (optional) for transparency and debugging.

Lightweight, fast, and easy to integrate with any backend.

## Categories & Their Color Highlights
Category	Color	Hex Code
Work	Blue	#4d79ff
Personal	Green	#66cc66
Newsletter	Purple	#9966ff
Promotions	Orange	#ffb84d
Academic	Teal	#33cccc
Finance	Golden	#ff9933
Bills	Red-Pink	#ff6666
Support / Complaint	Magenta	#ff66cc
Spam	Bright Red	#ff4d4d
Events / Invitations	Light Pink	#ff99ff
Delivery / Orders	Sky Blue	#66b2ff

Each output block wraps the predicted category in a styled <div>:

<div style="background:#4d79ff; padding:12px; border-radius:8px; color:white;">
  Category: Work  
  Reason: Detected formal tone and project-related context.
</div>

## How It Works

The model receives the email body as input.

It analyzes the tone, keywords, structure, and intent.

It selects the closest matching category.

It returns the category wrapped in a styled HTML block.

You can directly plug this into any UI:

document.getElementById("result").innerHTML = output;

## Example Output

Input Email:

"Hey, your package is arriving tomorrow. Track it using the link below."

## HTML Output:

<div style="background:#66b2ff; padding:12px; border-radius:8px; color:white;">
  Category: Delivery / Orders  
  Reason: Mentions tracking, order status, and delivery timeline.
</div>
