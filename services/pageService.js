app.service("pageService", function(){
	
	this.Paging = {};
	this.Paging.required = false; //is paging required
	this.Paging.noOfPages = 0; // no of pages 
	this.Paging.currPage = 0; //  cuuurent displayed page
	this.Paging.noOfRecords = 0; //no of records in data store
	this.Paging.pageStart = 0; //first record that a particular page displays
	this.Paging.pageEnd = 0; //last record that a particular page displays	
	this.Paging.pageCount = 15; // no of records to be displayed on a page
	this.Paging.showNext = false; // show next button
	this.Paging.showPrev = false; // show previous button   
	this.Paging.firstPage = 0; // first page of the pager
	this.Paging.lastPage = 0; // last page of the pager
    
	//initialise pager variables
	this.init = function(obj,pc=15)
	{		
		
		this.Paging.pageCount = pc;
		this.Paging.noOfRecords = obj.data.length;
		this.Paging.required = (obj.data.length >=15) ? true : false;
		if(!this.Paging.required)
		{			
			this.Paging.pageCount = obj.data.length; 
		}
		else
		{
			this.Paging.noOfPages = parseInt(this.Paging.noOfRecords / this.Paging.pageCount) + 1;
			this.Paging.noOfPages =  (this.Paging.noOfPages==0) ? 1 : this.Paging.noOfPages;	
		}	
		this.Paging.currPage = 0;
		this.Paging.firstPage = 0;
		this.Paging.lastPage = this.Paging.noOfPages-1;
		//console.log(this.Paging.lastPage);
		this.Paging.pageStart = this.Paging.currPage * this.Paging.pageCount
		this.Paging.pageEnd = this.Paging.pageStart + this.Paging.pageCount -1;
		if(this.Paging.noOfPages == 1)
			this.Paging.showNext = false;
		else
			this.Paging.showNext = true;
		this.Paging.showPrev = false;
		this.populatePage(obj);

	};
	// traverse to first page
	this.First = function(obj)
	{
		this.Paging.currPage = this.Paging.firstPage;
		this.Paging.pageStart = this.Paging.currPage * this.Paging.pageCount;
		this.Paging.pageEnd = this.Paging.pageStart + this.Paging.pageCount -1;
		this.Paging.showPrev = false;
		this.populatePage(obj);
	};
	// traverse to last page
	this.Last = function(obj)
	{
		this.Paging.currPage = this.Paging.lastPage;
		this.Paging.pageStart = this.Paging.currPage * this.Paging.pageCount;
		this.Paging.pageEnd = this.Paging.pageStart + this.Paging.pageCount -1;
		this.Paging.showNext = false;
		this.populatePage(obj);
	};
    // traverse to next page
	this.Next = function(obj)
	{	
		this.Paging.currPage = (this.Paging.currPage + 1) % this.Paging.noOfPages;
		this.Paging.pageStart = this.Paging.currPage * this.Paging.pageCount;
		this.Paging.pageEnd = this.Paging.pageStart + this.Paging.pageCount -1;
		this.populatePage(obj);
		if(this.Paging.currPage > 0)
			this.Paging.showPrev = true;
		
		if((this.Paging.currPage+1) == this.Paging.noOfPages)
			this.Paging.showNext = false;
    };    
    // traverse to previous page
	this.Previous = function(obj)	
	{						
		if(this.Paging.currPage == 0 )
		{
			this.Paging.showPrev = false;
			return;
		}
		this.Paging.currPage = (this.Paging.currPage - 1) % this.Paging.noOfPages;
		if(this.Paging.currPage == 0 )
		{
			this.Paging.showPrev = false;
			
		}		
		this.Paging.pageStart = this.Paging.currPage * this.Paging.pageCount;
		this.Paging.pageEnd = this.Paging.pageStart + this.Paging.pageCount -1;		
		this.populatePage(obj);
    };	   
    // populate a dta2show array i.e the current page
	this.populatePage = function(obj)
	{
		var k =0;						
		//console.log(this.Paging.currPage);
		//console.log(obj);
			for(var i = this.Paging.pageStart; i<= this.Paging.pageEnd; i++)
			{			
				obj.data2show[k] = obj.data[i];
				k++;
			}
		
	};
	//get cuurent page value 
	this.getCurrentPage1 = function()
	{
		return this.Paging.currPage;
	};
	// whether the next button is to be displayed
	this.showNext = function()
	{
		var result = (this.getNoOfPages() != this.getCurrentPage()) ? true : false;
		return result;
	};
	// whether the previous button is to be displayed
	this.showPrevious = function()
	{
		if(this.Paging.currPage == 0)
			return false;
		else
			return true;
	};	
	// get current page value + 1
	this.getCurrentPage = function()
	{
		return this.Paging.currPage + 1;
	};
	// get no of to be displayed
	this.getNoOfPages = function()
	{
		return this.Paging.noOfPages;
	};
	// is paging required
	this.pagingRequired = function()
	{
		return this.Paging.required;
	};

});