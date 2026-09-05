# Shelter. Part 1–2 - Fixed & Responsive Layout
## Tasks [Part 1-3](https://github.com/rolling-scopes-school/tasks/blob/master/stage0.5%20Bootcamp/tasks/shelter/shelter.md)

## Deployment
https://skibsky-ivan.github.io/shelter/shelter/HTML/Main.html

### Layout and Navigation

* [x] Navigation between Main and Pets pages is implemented
* [x] Anchor links navigate to the corresponding sections
* [x] Logo navigation works according to the specification
* [x] Footer links open email client, phone dialer, and Google Maps
* [x] Empty links are implemented where required

### Responsive Layout

* [x] Layout matches the design at **1280px**
* [x] Layout matches the design at **768px**
* [x] Layout matches the design at **320px**
* [x] Smooth adaptation between breakpoints
* [x] No horizontal scrolling across the supported viewport range
* [x] Burger icon replaces navigation below **768px**
* [x] Valid HTML markup

---

# Shelter. Part 3 - JavaScript Functionality

## Burger Menu

* [x] Burger menu opens below **768px**
* [x] Opening/closing animation is implemented
* [x] Burger icon transforms into a close icon
* [x] Menu closes by:

  * [x] close button
  * [x] overlay click
  * [x] navigation link click
* [x] Background scrolling is disabled while the menu is open

## Infinite Carousel Slider (Main page)

* [x] Displays **3 / 2 / 1** cards depending on screen width
* [x] Previous / Next navigation buttons
* [x] Cards are generated from `pets.json`
* [x] No duplicate pets between consecutive slides
* [x] All pets inside a slide are unique
* [x] Randomized card order
* [x] Smooth sliding animation
* [x] Repeated clicks are ignored while animation is running

## Pagination (Pets page)

* [x] Generates **48** pet cards
* [x] Every pet appears the same number of times
* [x] No adjacent duplicate cards
* [x] Stable card order during the session
* [x] First / Previous / Current / Next / Last controls
* [x] Disabled controls are non-interactive
* [x] Animated page switching

## Popup

* [x] Opens by clicking any pet card
* [x] Displays complete pet information from `pets.json`
* [x] Dark overlay is implemented
* [x] Closes via close button or overlay click
* [x] Background scrolling is disabled while popup is open
* [x] Responsive layout at **1280px**, **768px**, and **320px**
