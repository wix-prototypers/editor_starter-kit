# **Editor Starter Kit 1.0 🚀**

![screnshot](https://github.com/wix-prototypers/editor_starter-kit/blob/master/screenshot.png)

### **Introduction**

The "Editor Starter Kit" project includes out-of-the-box functionality that can help creating prototypes of
features inside thr classic editor

### **1.Installation 🔗**

#### Local usage requires serving the HTML via live server:

`Atom:`
https://atom.io/packages/atom-live-server

`VS-code:`
https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer

Add the following links in your prototype's index file.

```HTML
<script type="module" src="https://cdn.jsdelivr.net/gh/wix-prototypers/editor_starter-kit@1.1.7-beta/src/App.js" />

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
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/wix-prototypers/prototypers_prototype-panel@2/dist/prototypePanel.css">
      <link rel="icon" href="./Images/fav.png" type="image/x-icon">
   <body>
      <div id="stage" >
         <div class="template">
            <div class="element-container strip header" hat="Header" gfpp="Manage-Items animation">
               <div class="element-container logo top-menu-items" hat="Text"><span>Hello</span></div>
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
            <div class="element-container strip hero" hat="Strip" id="s0" >
               <div class="element-container resizable draggable" id="e0" hat="Title" gfpp="Edit-Text animation design help">
                  <div class="text-content">
                     Hello
                  </div>
               </div>
            </div>
            <div class="element-container strip"  hat="Strip" id="s1" >

            </div>

         </div>
      </div>
      <div id="editor"></div>
      <div class="floating-panel" element="e0" gfpp-trigger="Edit-Text" title="Hello Panel" >
        Panel Content here
      </div>
     <script src="https://cdn.jsdelivr.net/gh/wix-prototypers/prototypers_prototype-panel@2/dist/prototypePanel.js"></script>
  <script type="module" src="https://cdn.jsdelivr.net/gh/wix-prototypers/editor_starter-kit@1.1.7-beta/src/App.js"> </script>
<script src="./project.js"> </script>
</body>
</html>

```

### **2.Using Snippets 🔗**

#### To set up the editor and stage components, consider using the following structure in your `index.html`

```HTML
  <body>
      <div id="stage" >
         <div class="template">
   ... add site componrnts here(elements, strips,header footer etc..)
         </div>
      </div>
      <div id="editor"></div>

  ... add editor utilites here(mainly floating panels )
      </div>
  <body>
```

#### Stage Snippets

##### Elemement - Creates a fullwidth strip

```HTML
 <div class="element-container resizable draggable" id="e0" hat="Title" gfpp="Edit-Text animation design help" style="top:50px; left:30px;">
     Your Content Here, The size of the content will determine the size of the container
</div>
```

##### Strip snippet - Creates a fixed (not draggable) fullwidth strip

```HTML
  <div class="element-container strip hero"  hat="Strip" id="s0" >
 </div>
```

##### Adding Gfpp Buttons To stage elements :

```HTML
  <div class="element-container" gfpp=...
```

Full Supported values list :

##### Main Actions (Text Buttons)

- Edit-Text
- Change-Background
- Change-Text
- Edit-Button
- Settings
- Manage-Menu
- Manage-Media
- Change-Design
- Manage-Items
- Change-Basic-Shape
- Change-Vector-Art
- Change-Strip-Background
- Change-Section-Background
- Change-Image

##### Icon buttons

- design  <img width="40" style="transform:translate(0px,30px)" alt="Screen Shot 2022-02-01 at 11 34 32" src="https://user-images.githubusercontent.com/61973635/151944350-dfa9041b-1713-43c4-b1ce-daa12d113658.png">
- effects
- layout
- link
- data
- crop
- strech

- animation
- help
- hover
- transition

#### Editor snippets

##### Floating Panel

```HTML
 <div class="floating-panel" element="e0" gfpp-trigger="Edit-Text" title="Hello Panel" >
         Panel Content Here
</div>
```

Floating panels are triggered by gfpp buttons of stage elements.
Change the `element` attribute to be the `id` of the desired stage-element, and the `gfpp-trigger` to the button triggering the panel.
please make sure the button you choose exists and defined(see instructions above

### **3.Using The Prototype API 🔗**

<table>
  <tr>
   <td>
    Property
   </td>

   <td>
    DESCRIPTION
   </td>
   <td>
    Values
   </td>
  </tr>
  <tr>
   <td>
      state.leftPanel
   </td>

   <td>Open one one of the left panels, or close the panel
   </td>
   <td>
  add | pages | design | media | apps | bussiness | false
   </td>
  </tr>
  <tr>
     <td>state.zoomMode

   </td>
   <td>Toggle Zoom Out view
   </td>
   <td>
     true | false 
   </td>
  </tr>

  <tr>
     <td>state.selectedElement

   </td>
   <td> fetch selected element from stage or trigger selection
   </td>
   <td>
  JS element
   </td>
  </tr>
  
</table>
