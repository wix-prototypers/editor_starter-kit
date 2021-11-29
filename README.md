# **Editor Starter Kit 1.0 🚀**

![screnshot](https://github.com/wix-prototypers/editor_starter-kit/blob/master/screenshot.png)

### **Introduction**

The "Editor Starter Kit" project includes out-of-the-box functionality that can help creating prototypes of
features inside thr classic editor

### **1.Installation 🔗**

Add the following links in your prototype's index file.

```HTML
<script type="module" src="https://cdn.jsdelivr.net/gh/wix-prototypers/editor_starter-kit@1.0.0.8/src/App.js" />

```

The following HTML snippet will genrate the editor and a basic site (header,footer ,strip,element and floating panel):

```HTML
<!DOCTYPE html>
<html lang="en">
   <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <title> Editor | Starter Kit </title>
      <link rel="stylesheet" href="./project.css" >
      <link rel="icon" href="./Images/fav.png" type="image/x-icon">
   <body>
      <div id="stage" >
         <div class="template">
            <div class="element-container strip header" hat="Header" gfpp="Manage-Items animation">
               <div class="element-container top-menu-items" gfpp="Manage-Menu Navigate layout design animation help" hat="Horizontal Menu">
                  <div class="menu-item" value="home">Home</div>
                  <div class="menu-item" value="upcoming-shows">Upcoming Shows</div>
                  <div class="menu-item" value="about">About</div>
                  <div class="menu-item" value="videos">Videos</div>
                  <div class="menu-item" value="gallery">Gallery</div>
                  <div class="menu-item" value="contact">Contact</div>
                  <div class="menu-item" value="writing">Writing</div>
               </div>
            </div>
            <div class="element-container strip hero"  hat="Strip" id="s0" >
               <div class="element-container resizable draggable" id="e0" hat="Title" gfpp="Edit-Text animation design help">
                  <div class="text-content">
                     Hello
                  </div>
               </div>
            </div>
         </div>
      </div>
      <div id="editor"></div>
      <div class="floating-panel" element="e0" gfpp-trigger="Edit-Text" title="Hello Panel" >
         lorem ipsum
      </div>
      <script type="module" src="https://cdn.jsdelivr.net/gh/wix-prototypers/editor_starter-kit@1.0.0.8/src/App.js" > </script>
   </body>
</html>

```

### **2.Using Snippets 🔗**

### **3.Using The Prototype API 🔗**
