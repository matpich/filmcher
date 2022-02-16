export class Pagination {
	constructor() {
		this.totalPages = null;
		this.currentPage = 1;
		this.pagesAll = [];
	}

	slicer() {
		//prevents from repeating this each time when changing page
		if (this.pagesAll.length == 0) {
			for (let i = 1; i <= this.totalPages; i++) {
				this.pagesAll.push(i)
			}
		}

		//if there's no more than 9 pages it just returns all of them
		if (this.totalPages <= 9) {
			return this.pagesAll;
		//however if there's more then it needs to check the current page to display proper range if the current page is less than 5
		} else if (this.totalPages >= 10 && this.currentPage < 5) {
			return this.pagesAll.slice(0, 9);
		} else {
			//if there are more than 9 pages in total and current page is bigger than 5 it checks if there are at least 4 pages till the end
			if (this.totalPages - this.currentPage >= 4) {
				return this.pagesAll.slice(this.currentPage - 5, this.currentPage + 4);
			//if the current page is bigger than 5 and there are less than 4 pages till the end then it just returns the last pages
			} else {
				console.log(this.pagesAll.slice(-9));
				return this.pagesAll.slice(-9);
			}
		}
	}

	//displays selected part of pagination
	displayer(parentSearchObject) {
		let arr = this.slicer();

		let pagCont = document.querySelector('.pagination-container');

        //below line removes previous pagination if exists
		document.querySelectorAll(".single-page").forEach(el => el.remove());

		arr.forEach(el => {
			let page = document.createElement('div');
			page.appendChild(document.createTextNode(el));
			page.className = "single-page"
			page.setAttribute('data-page-number', el)

			//colorize the currently displayed page
			if (el == this.currentPage) {
				page.className += " current";
			}

			//inserts page numbers into pagination container
			pagCont.appendChild(page);
		})
		let leftArrow = document.createElement('div');
		leftArrow.appendChild(document.createTextNode('<<'));
		leftArrow.className = "single-page";
		leftArrow.setAttribute('data-page-number', 'left')

		let rightArrow = document.createElement('div');
		rightArrow.appendChild(document.createTextNode('>>'));
		rightArrow.className = "single-page";
		rightArrow.setAttribute('data-page-number', 'right')

		pagCont.insertBefore(leftArrow, pagCont.firstChild);
		pagCont.appendChild(rightArrow);

		pagCont.addEventListener('click', el => {
			let pageNumber = el.target.dataset.pageNumber;
			if (pageNumber == undefined) {
				return;
			} else if (pageNumber == 'left' && this.currentPage > 1) {
				this.currentPage--;
				parentSearchObject.search();

			} else if (pageNumber == 'right' && this.currentPage < this.totalPages) {
				this.currentPage++;
				parentSearchObject.search();

			} else {
				this.currentPage = Number(pageNumber);
				parentSearchObject.search();

			}
		})
	}
}