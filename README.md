less-grid 1.1.0
=========

> Responsive dynamic grid generator with fluid or fixed breakpoints


## Quickstart
This project requires LESS `^1.5` and NodeJS `^0.10.0`

If you haven't used [NodeJS](http://nodejs.org/) before, make sure to grab a copy from their website and install it on your system. Once you're done, clone this repo or download it, navigate to it's folder and run this command:

```shell
npm install
```
This will look into package.json file and download all the dependencies the project requires.


Edit the variables in `grid.less` file and run `grunt compile`. Your grid.css is located in `bin` folder and ready for use!


## Less part

_Grid variables are located in `grid.less` file and this is the only file you need to change._

### Options

#### @page_width
Type: `px` `%`

Default: 960px.

Specifies row width which will contain columns. Can be set in pixels or percentage.

_NOTE: If you specify a fluid width in percentages, the gutter can only be set in percentage units aswell._

#### @max_columns
Type: `Int`

Default: `16`

Number of columns your grid will use. This will generate `.span_[1-n]` classes where `n` represents `@max_columns` 

#### @gutter
Type: `px` `%`

Default: `0%`

Defines the margin between the inner columns. Outermost borders remain intact.

#### @padding
Type: `px` `%`

Default: `0px 10px`

Defines the column padding; 

Accepts CSS padding values, for example: `0 10px;` will make the content padded on the outer borders fo 10px and 20px space between columns.


### Usage Example

Let's say we want to emulate the [Skeleton](http://www.getskeleton.com) grid:
```less
@page_width: 960px;
@max_columns: 16;
@padding: 0 10px;
@gutter: 0%;
```


## CSS part

less-grid generates three core classes you will work with, as well as a few special ones. 

#### .row

Holder and positioner of our columns. Always use for wrapping `.columns`. Nested `.row`s width changes to 100% and they remove the padding and margin on outermost columns.

#### .column, .columns

Common settings for all columns. Always used in conjunction with `.span[1-n]` classes.

#### .span[1-n]

Dynamicaly generated spans based on grid settings. Defining width, padding and gutter on columns.

#### .push[1-n], .pull[1-n]

Dynamicaly generated classes for column offsets. `.push[1-n]` offsets columns to the right and `.pull[1-n]` offsets them to the left.

Imagine you have a sidebar on the left side:
```html
<div class="row">
	<div id="sidebar" class="span4  columns"></div>
	<div id="content" class="span12 columns"></div>
</div>
```

This will put the sidebar ontop of content on mobile views, but in a lot of cases you'd prefer the content on top. No problem! Just switch the order and push the columns in the right place:
```html
<div class="row">
	<div id="content" class="span12 columns pull4"></div>
	<div id="sidebar" class="span4  columns push12"></div>
</div>


#### .half, .qtr, .one-third, .two-thirds

This special spans are for times, when `@max_columns` is not dividable by number 2 or 3 and you wish to have a column span half, one quarter, one third or two thirds of the row width.

On screen sizes with width lower than 768px all the columns switch to rows. However the `.qtr` switches to two column width and `.half` remains all down to widths  480px.

### Usage Examples

Let's say we have a 16 column grid and we want four equal columns (16/4=4) -> span4:
```html
<div class="row">
	<div class="span4 columns"></div>
	<div class="span4 columns"></div>
	<div class="span4 columns"></div>
	<div class="span4 columns"></div>
</div>
```

However if we wish to have a better responsive layout the following markup will generate exactely the same result, but on mobile devices in landscape mode we'll still have two column layout:
```html
<div class="row">
	<div class="qtr columns"></div>
	<div class="qtr columns"></div>
	<div class="qtr columns"></div>
	<div class="qtr columns"></div>
</div>
```

#### New feature: *@omitColumns*

All the dynamicaly generated class names were moved into variables. If you'd like to further simplify the markup the `@omitColumns` boolean will extend all the dynamic classes with `.columns` class and you get rid of the need to include it in the markup.

Go ahead and tailor your grid to your liking! e.g.:
`@column_prefix: u` (u as in units instead of span)
`@omitColumns: true`

And you'll get a new markup:
```html
<div class="row">
	<div class="u4"></div>
	<div class="u12"></div>
</div>
```

## Release History

 * 2014-06-21		v1.1.0 	 
 	- Added new features:
 		- nested rows
 		- push/pull classes
 		- option to omit .columns class
 	- Optimized CSS output for smaller footprint
 	- Updated classnames for simplicity * 2014-04-30   v1.0.0   First release
 * 2014-04-23   v0.3.0   Added mobile support
 * 2014-04-17   v0.2.0   Added dynamic column generation
 * 2014-04-17   v0.1.1   Updated Grunt config
 * 2014-04-16   v0.1.0   Initial commit
---

Task submitted by [Matej Svajger](mailto://hello@matejsvajger.com/)

*[LESS Grid, MUCH Responsive!](http://i0.kym-cdn.com/photos/images/newsfeed/000/581/296/c09.jpg)*