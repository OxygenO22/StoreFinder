
let storeId;
let productId;
let searchItem = document.querySelector("#search__item");
let asideList = document.querySelector("#aside__list");
let storesSearch = document.querySelector("#stores__search");
let detailsInfo = document.querySelector("#details__info");
let storeDetails = document.querySelector("#store__details");
let tableProducts = document.querySelector("#table__products");
let storesNoselect = document.querySelector("#stores__noselect");
let sortInner = document.querySelector("#sort__inner");
let sortButtonQSAll = document.querySelectorAll("#sort__button");
let buttonCountAll = document.querySelector("#button__count-all");
let buttonCountOk = document.querySelector("#button__count-ok");
let buttonCountStor = document.querySelector("#button__count-stor");
let buttonCountOut = document.querySelector("#button__count-out");
let searchButtonSerch = document.querySelector("#search__button-serch");
let productsSearchButton = document.querySelector("#products-search__button");
let productsReSearchButton = document.querySelector("#products-research__button");
let productsSearchItem = document.querySelector("#products-search__item");
let searchButtonReserch = document.querySelector("#search__button-reserch");
let buttonHideshowList = document.querySelector("#button__hideshow-list");
let buttonHideshowDetails = document.querySelector("#button__hideshow-details");
let buttonUpList = document.querySelector("#button__up-list");
let buttonDownList = document.querySelector("#button__down-list");
let buttonFixList = document.querySelector("#button__fix-list");
let buttonUpDetails = document.querySelector("#button__up-details");
let buttonDownDetails = document.querySelector("#button__down-details");
let buttonFixDetails = document.querySelector("#button__fix-details");
let tableRownames = document.querySelector("#table__rownames");
let storeDetailsFooter = document.querySelector("#store-details__footer");
let storeListFooter = document.querySelector("#store-list__footer");
let popupManipulationProduct = document.querySelector("#popup__manipulation-product");
let popupCreateStore = document.querySelector("#popup__create-store");
let popupConfirmation = document.querySelector("#popup__confirmation");
let popupNotfound = document.querySelector("#popup__notfound");
let popupFillinput = document.querySelector("#popup__fillinput");
let popupMainText = document.querySelector("#popup__main-text");
let popupFooterProduct = document.querySelector("#popup__footer-product");
let popupFooterStore = document.querySelector("#popup__footer-store");
let popupFooterConfirmation = document.querySelector("#popup__footer-confirmation");
let popupHeaderTitleProduct = document.querySelector("#popup__header-title-product");
let popupButtonCreateProduct = document.querySelector("#popup__button-create-product");
let popupButtonSaveProduct = document.querySelector("#popup__button-save-product");
let popupButtonNotfound = document.querySelector("#popup__button-notfound");
let popupButtonFillinput = document.querySelector("#popup__button-fillinput");
let nameInputProductWrapper = document.querySelector("#input-wrapper__name-product");
let priceInputWrapper = document.querySelector("#input-wrapper__price-product");
let specsInputWrapper = document.querySelector("#input-wrapper__specs-product");
let ratingInputWrapper = document.querySelector("#input-wrapper__rating-product");
let supinfoInputWrapper = document.querySelector("#input-wrapper__supinfo-product");
let madeinInputWrapper = document.querySelector("#input-wrapper__madein-product");
let compnameInputWrapper = document.querySelector("#input-wrapper__compname-product");
let statusInputWrapper = document.querySelector("#input-wrapper__status-product");
let nameInputStoreWrapper = document.querySelector("#input-wrapper__name-store");
let emaleInputWrapper = document.querySelector("#input-wrapper__email-store");
let phoneInputWrapper = document.querySelector("#input-wrapper__phone-store");
let addressInputWrapper = document.querySelector("#input-wrapper__address-store");
let dateInputWrapper = document.querySelector("#input-wrapper__date-store");
let areaInputWrapper = document.querySelector("#input-wrapper__area-store");

/**
 * Load stores from the server when DOMContentLoaded.
 *
 * @listens DOMContentLoaded
 *
 * @private
 */
window.addEventListener("DOMContentLoaded", () => {
   getStores();
});

/**
 * Creates Store List. 
 * 
 * @param {Object[]} stores the array of stores.    
 *  
 * @public
 */
function createStoresList(stores) {
   asideList.innerHTML = renderStoresList(stores);

   /**
    * Show background for current store button.
    *
    * @param {*} event the current store button.
    *
    */
   for (let curLi of document.querySelectorAll("#store-list__item")) {
      curLi.addEventListener("click", function () {
         document.querySelectorAll("#store-list__item").forEach(li => li.classList.remove("js-active-backround"));
         this.classList.toggle("js-active-backround");
      });
   };

   asideList.addEventListener("click", (event) => {
      storeId = parseFloat(event.target.closest("li").dataset.storeId);
      createStoreInformation(storeId, stores);
      getProducts();

      storeDetails.classList.add("js-active");
      storesNoselect.classList.add("js-hide");
      document.querySelector("#products-search__item").value = "";
      sortButtonQSAll.forEach(button => button.classList.remove("js-active-backround-border"));
      document.querySelector("[data-button-status-all]").classList.add("js-active-backround-border");
      document.querySelector("[data-button-status-ok]").setAttribute("data-button-status-ok", "");
      document.querySelector("[data-button-status-storage]").setAttribute("data-button-status-storage", "");
      document.querySelector("[data-button-status-outstok]").setAttribute("data-button-status-outstok", "");
      document.querySelector("[data-button-status-all]").setAttribute("data-button-status-all", "ALL");
      document.querySelectorAll("[data-sort-type]").forEach(dataPropName => {
         dataPropName.innerText = "☰";
      });
   });
};

/**
 * Creates an information field of the selected store. 
 * 
 * @param {number} storeId the id of selected store. 
 * 
 * @param {Object[]} stores the array of stores.    
 *  
 * @public
 */
function createStoreInformation(storeId, stores) {
   let selectedStore = stores.filter(store => store.id === storeId);
   detailsInfo.innerHTML = renderInformationField(selectedStore);
}

/**
 * Creates a table of all products of the selected store. 
 * 
 * @param {Object[]} products the array of products.    
 *  
 * @public
 */
function createStoreProducts(products) {
   tableProducts.innerHTML = renderProductTable(products);
}

/**
 * Create new Store. 
 * 
 * @param {string} nameInputValue the store "Name". 
 *  
 * @param {string} emailInputValue the store "Email". 
 * 
 * @param {number} phoneInputValue the store "PhoneNumber".
 * 
 * @param {string} addressInputValue the store  "Address". 
 * 
 * @param {string} dateInputValue the store "Established".
 * 
 * @param {number} areaInputValue the store "FloorArea".    
 *  
 * @returns {Object} newStore the new created store.
 *
 * @public
 */
function createNewStore(nameInputValue, emailInputValue, phoneInputValue, addressInputValue, dateInputValue, areaInputValue) {

   let newStore = {
      "Name": nameInputValue,
      "Email": emailInputValue,
      "PhoneNumber": phoneInputValue,
      "Address": addressInputValue,
      "Established": dateInputValue,
      "FloorArea": areaInputValue,
   };
   addStore(newStore);
}

/**
 * Validate Store Form.
 */
function validationCreateStoreForm() {
   /* Name input */
   let nameInputValue = document.querySelector("#form-item__name-store").value;

   try {
      if (nameInputValue == "") {
         throw "the Name is empty";
      }
      nameInputStoreWrapper.dataset.validationStoreMessage = "Ok";
      nameInputStoreWrapper.classList.remove("validation-error");
      nameInputStoreWrapper.classList.add("validation-success");
   } catch (err) {
      nameInputStoreWrapper.dataset.validationStoreMessage = err;
      nameInputStoreWrapper.classList.remove("validation-success");
      nameInputStoreWrapper.classList.add("validation-error");
   }
   /* Email input */
   let emailInputValue = document.querySelector("#form-item__email-store").value;

   try {
      if (emailInputValue == "") {
         throw "the Email is empty";
      }
      emaleInputWrapper.dataset.validationStoreMessage = "Ok";
      emaleInputWrapper.classList.remove("validation-error");
      emaleInputWrapper.classList.add("validation-success");
   } catch (err) {
      emaleInputWrapper.dataset.validationStoreMessage = err;
      emaleInputWrapper.classList.remove("validation-success");
      emaleInputWrapper.classList.add("validation-error");
   }
   /* Phone input */
   let phoneInputValue = document.querySelector("#form-item__phone-store").value;

   try {
      if (phoneInputValue == "") {
         throw "the Phone number is empty";
      }
      phoneInputWrapper.dataset.validationStoreMessage = "Ok";
      phoneInputWrapper.classList.remove("validation-error");
      phoneInputWrapper.classList.add("validation-success");
   } catch (err) {
      phoneInputWrapper.dataset.validationStoreMessage = err;
      phoneInputWrapper.classList.remove("validation-success");
      phoneInputWrapper.classList.add("validation-error");
   }
   /* Address input */
   let addressInputValue = document.querySelector("#form-item__address-store").value;

   try {
      if (addressInputValue == "") {
         throw "the Address is empty";
      }
      addressInputWrapper.dataset.validationStoreMessage = "Ok";
      addressInputWrapper.classList.remove("validation-error");
      addressInputWrapper.classList.add("validation-success");
   } catch (err) {
      addressInputWrapper.dataset.validationStoreMessage = err;
      addressInputWrapper.classList.remove("validation-success");
      addressInputWrapper.classList.add("validation-error");
   }
   /* Date input */
   let dateInputValue = document.querySelector("#form-item__date-store").value;

   try {
      if (dateInputValue == "") {
         throw "the Ectablished date is empty";
      }
      dateInputWrapper.dataset.validationStoreMessage = "Ok";
      dateInputWrapper.classList.remove("validation-error");
      dateInputWrapper.classList.add("validation-success");
   } catch (err) {
      dateInputWrapper.dataset.validationStoreMessage = err;
      dateInputWrapper.classList.remove("validation-success");
      dateInputWrapper.classList.add("validation-error");
   }
   /* Area input */
   let areaInputValue = document.querySelector("#form-item__area-store").value;

   try {
      if (areaInputValue == "") {
         throw "the Floor area is empty";
      }
      areaInputWrapper.dataset.validationStoreMessage = "Ok";
      areaInputWrapper.classList.remove("validation-error");
      areaInputWrapper.classList.add("validation-success");
   } catch (err) {
      areaInputWrapper.dataset.validationStoreMessage = err;
      areaInputWrapper.classList.remove("validation-success");
      areaInputWrapper.classList.add("validation-error");
   }

   /**
    * Checks if the store form is filled out correctly.
    */
   let formFields = document.querySelectorAll("[data-validation-store-message]");
   let formFieldsIsOk = 0;
   formFields.forEach(validation => {
      if (validation.dataset.validationStoreMessage === "Ok") {
         ++formFieldsIsOk;
      }
   });
   if (formFields.length === formFieldsIsOk) {
      createNewStore(nameInputValue, emailInputValue, phoneInputValue, addressInputValue, dateInputValue, areaInputValue);
      resetStoreForm();
   } else {
      fillInput();
   }
}

/**
 * Reset Store Form.
 */
function resetStoreForm() {
   document.querySelector("#popup__main-form-store").reset();
   popupCreateStore.classList.remove("js-active");
   popupCreateStore.classList.remove("js-active");
   nameInputStoreWrapper.classList.remove("validation-success", "validation-error");
   emaleInputWrapper.classList.remove("validation-success", "validation-error");
   phoneInputWrapper.classList.remove("validation-success", "validation-error");
   addressInputWrapper.classList.remove("validation-success", "validation-error");
   dateInputWrapper.classList.remove("validation-success", "validation-error");
   areaInputWrapper.classList.remove("validation-success", "validation-error");
}

/**
 * Button control for button PopUp Create store.
 *
 * @returns {HTMLButtonElement} the button element.
 */
storeListFooter.addEventListener("click", event => {
   if (event.target.closest("#button__create-store")) {
      popupCreateStore.classList.add("js-active");
   }
});

popupFooterStore.addEventListener("click", event => {
   if (event.target.closest("#popup__button-create-store")) {
      validationCreateStoreForm();
   }
   if (event.target.closest("#popup__button-cancel-store")) {
      resetStoreForm();
   }
});

/**
 * Create new Product. 
 * 
 * @param {string} nameInputValue the product "Name". 
 * 
 * @param {number} priceInputValue the product "Price". 
 *  
 * @param {string} specsInputValue the product "Specs". 
 * 
 * @param {number} ratingInputValue the product "Rating".
 * 
 * @param {string} suplinfoInputValue the product  "SupplierInfo". 
 * 
 * @param {string} countryInputValue the product "MadeIn".
 * 
 * @param {string} prodnameInputValue the product "ProductionCompanyName".
 * 
 * @param {string} statusInputValue the product "Status".  
 * 
 * @param {number} storeId the product "StoreId".    
 *  
 * @returns {Object} newProduct the new created Product.
 *
 * @public
 */
function createNewProduct(nameInputValue, priceInputValue, specsInputValue, ratingInputValue, suplinfoInputValue, countryInputValue, prodnameInputValue, statusInputValue, storeidInputValue, storeId) {

   let newProduct = {
      "Name": nameInputValue,
      "Price": priceInputValue,
      "Photo": "No photo",
      "Specs": specsInputValue,
      "Rating": +ratingInputValue,
      "SupplierInfo": suplinfoInputValue,
      "MadeIn": countryInputValue,
      "ProductionCompanyName": prodnameInputValue,
      "Status": statusInputValue,
      "StoreId": storeId
   }
   if (popupManipulationProduct.dataset.manipulationProduct === "Create") {
      addProduct(newProduct);
   } else {
      editProduct(newProduct);
   }
}

/**
 * Validate Product Form.
 */
function validationCreateProductsForm() {
   /* Name input */
   let nameInputValueProduct = document.querySelector("#form-item__name-product").value;

   try {
      if (nameInputValueProduct == "") {
         throw "the Name is empty";
      }
      nameInputProductWrapper.dataset.validationProductMessage = "Ok";
      nameInputProductWrapper.classList.remove("validation-error");
      nameInputProductWrapper.classList.add("validation-success");
   } catch (err) {
      nameInputProductWrapper.dataset.validationProductMessage = err;
      nameInputProductWrapper.classList.remove("validation-success");
      nameInputProductWrapper.classList.add("validation-error");
   }
   /* Price input */
   let priceInputValue = document.querySelector("#form-item__price-product").value;

   try {
      if (priceInputValue == "") {
         throw "the Price is empty";
      }
      priceInputWrapper.dataset.validationProductMessage = "Ok";
      priceInputWrapper.classList.remove("validation-error");
      priceInputWrapper.classList.add("validation-success");
   } catch (err) {
      priceInputWrapper.dataset.validationProductMessage = err;
      priceInputWrapper.classList.remove("validation-success");
      priceInputWrapper.classList.add("validation-error");
   }
   /* Specs input */
   let specsInputValue = document.querySelector("#form-item__specs-product").value;

   try {
      if (specsInputValue == "") {
         throw "the Specs number is empty";
      }
      specsInputWrapper.dataset.validationProductMessage = "Ok";
      specsInputWrapper.classList.remove("validation-error");
      specsInputWrapper.classList.add("validation-success");
   } catch (err) {
      specsInputWrapper.dataset.validationProductMessage = err;
      specsInputWrapper.classList.remove("validation-success");
      specsInputWrapper.classList.add("validation-error");
   }
   /* Rating input */
   let ratingInputValue = document.querySelector("#form-item__rating-product").value;

   try {
      if (ratingInputValue == "") {
         throw "the Rating is empty";
      }
      ratingInputWrapper.dataset.validationProductMessage = "Ok";
      ratingInputWrapper.classList.remove("validation-error");
      ratingInputWrapper.classList.add("validation-success");
   } catch (err) {
      ratingInputWrapper.dataset.validationProductMessage = err;
      ratingInputWrapper.classList.remove("validation-success");
      ratingInputWrapper.classList.add("validation-error");
   }
   /* Supplier info input */
   let supinfoInputValue = document.querySelector("#form-item__supinfo-product").value;

   try {
      if (supinfoInputValue == "") {
         throw "the Supplier info is empty";
      }
      supinfoInputWrapper.dataset.validationProductMessage = "Ok";
      supinfoInputWrapper.classList.remove("validation-error");
      supinfoInputWrapper.classList.add("validation-success");
   } catch (err) {
      supinfoInputWrapper.dataset.validationProductMessage = err;
      supinfoInputWrapper.classList.remove("validation-success");
      supinfoInputWrapper.classList.add("validation-error");
   }
   /* Made in input */
   let madeinInputValue = document.querySelector("#form-item__madein-product").value;

   try {
      if (madeinInputValue == "") {
         throw "the Made in is empty";
      }
      madeinInputWrapper.dataset.validationProductMessage = "Ok";
      madeinInputWrapper.classList.remove("validation-error");
      madeinInputWrapper.classList.add("validation-success");
   } catch (err) {
      madeinInputWrapper.dataset.validationProductMessage = err;
      madeinInputWrapper.classList.remove("validation-success");
      madeinInputWrapper.classList.add("validation-error");
   }
   /* Production company name input */
   let compnameInputValue = document.querySelector("#form-item__compname-product").value;

   try {
      if (compnameInputValue == "") {
         throw "the Production company name is empty";
      }
      compnameInputWrapper.dataset.validationProductMessage = "Ok";
      compnameInputWrapper.classList.remove("validation-error");
      compnameInputWrapper.classList.add("validation-success");
   } catch (err) {
      compnameInputWrapper.dataset.validationProductMessage = err;
      compnameInputWrapper.classList.remove("validation-success");
      compnameInputWrapper.classList.add("validation-error");
   }
   /* Status input */
   let statusInputValue = document.querySelector("#form-item__status-product").value;

   try {
      if (statusInputValue == "") {
         throw "the Status is empty";
      }
      statusInputWrapper.dataset.validationProductMessage = "Ok";
      statusInputWrapper.classList.remove("validation-error");
      statusInputWrapper.classList.add("validation-success");
   } catch (err) {
      statusInputWrapper.dataset.validationProductMessage = err;
      statusInputWrapper.classList.remove("validation-success");
      statusInputWrapper.classList.add("validation-error");
   }

   /**
    * Checks if the product form is filled out correctly.
    */
   let formFields = document.querySelectorAll("[data-validation-product-message]");
   let formFieldsIsOk = 0;
   formFields.forEach(validation => {
      if (validation.dataset.validationProductMessage === "Ok") {
         ++formFieldsIsOk;
      }
   });
   if (formFields.length === formFieldsIsOk) {
      createNewProduct(nameInputValueProduct, priceInputValue, specsInputValue, ratingInputValue, supinfoInputValue, madeinInputValue, compnameInputValue, statusInputValue);
      resetProductForm();
      popupManipulationProduct.setAttribute("data-manipulation-product", "");
   } else {
      fillInput();
   }
}

/**
 * Reset Product Form.
 */
function resetProductForm() {
   document.querySelector("#popup__main-form-product").reset();
   popupManipulationProduct.classList.remove("js-active");
   popupButtonCreateProduct.classList.remove("js-active");
   popupButtonSaveProduct.classList.remove("js-active");
   nameInputProductWrapper.classList.remove("validation-success", "validation-error");
   priceInputWrapper.classList.remove("validation-success", "validation-error");
   specsInputWrapper.classList.remove("validation-success", "validation-error");
   ratingInputWrapper.classList.remove("validation-success", "validation-error");
   supinfoInputWrapper.classList.remove("validation-success", "validation-error");
   madeinInputWrapper.classList.remove("validation-success", "validation-error");
   compnameInputWrapper.classList.remove("validation-success", "validation-error");
   statusInputWrapper.classList.remove("validation-success", "validation-error");
}

/**
 * Fills in the form fields for editing product information.
 */
function fillEditProductForm(product) {
   document.querySelector("#form-item__name-product").value = product.Name;
   document.querySelector("#form-item__price-product").value = product.Price;
   document.querySelector("#form-item__specs-product").value = product.Specs;
   document.querySelector("#form-item__rating-product").value = product.Rating;
   document.querySelector("#form-item__supinfo-product").value = product.SupplierInfo;
   document.querySelector("#form-item__madein-product").value = product.MadeIn;
   document.querySelector("#form-item__compname-product").value = product.ProductionCompanyName;
   document.querySelector("#form-item__status-product").value = product.Status;
}

/**
 *Reset data atribute "data-manipulation-product".
   *
   * @returns {HTMLButtonElement} the button element.
   */
popupFooterProduct.addEventListener("click", event => {
   if (event.target.closest("#popup__button-create-product")) {
      validationCreateProductsForm();
   }
   if (event.target.closest("#popup__button-save-product")) {
      validationCreateProductsForm();
   }
   if (event.target.closest("#popup__button-cancel-product")) {
      resetProductForm();
      popupManipulationProduct.setAttribute("data-manipulation-product", "");
   }
});

storeDetailsFooter.addEventListener("click", event => {

   /**
    * Button control for product pop-up Create button.
    *
    * @returns {HTMLButtonElement} the button element.
    */
   if (event.target.closest("#button__create-product")) {
      popupManipulationProduct.classList.add("js-active");
      popupHeaderTitleProduct.innerText = "Create new product";
      popupButtonCreateProduct.classList.add("js-active");
      popupManipulationProduct.setAttribute("data-manipulation-product", "Create");
   }

   /**
    * Button control for Store pop-up Delete button.
    *
    * @returns {HTMLButtonElement} the button element.
    */
   if (event.target.closest("#button__delete-store")) {
      popupConfirmation.classList.add("js-active");
      popupMainText.innerText = "Are you sure you want to delete this store?";
      popupConfirmation.setAttribute("data-confirm-type", "Store");
   }
});

tableProducts.addEventListener("click", event => {
   productId = event.target.closest("[data-product-id]").dataset.productId;

   /**
    * Button control for Product pop-up Delete button.
    *
    * @returns {HTMLButtonElement} the button element.
    */
   if (event.target.closest("[data-button-delete]")) {
      popupConfirmation.classList.add("js-active");
      popupMainText.innerText = "Are you sure you want to delete this product?";
      popupConfirmation.setAttribute("data-confirm-type", "Product");
   }

   /**
    * Button control for Product pop-up Edit button.
    *
    * @returns {HTMLButtonElement} the button element.
    */
   if (event.target.closest("[data-button-edit]")) {
      getInfoFoEditProduct();
      popupManipulationProduct.classList.add("js-active");
      popupHeaderTitleProduct.innerText = "Edit product";
      popupButtonSaveProduct.classList.add("js-active");
      popupManipulationProduct.setAttribute("data-manipulation-product", "Edit");
   }
});

popupFooterConfirmation.addEventListener("click", event => {

   /**
    * Button control for pop-up confirmation button Ok.
    *
    * @returns {HTMLButtonElement} the button element.
    */
   if (event.target.closest("#popup__button-Ok") && popupConfirmation.dataset.confirmType === "Store") {
      deleteStore();
      popupConfirmation.classList.remove("js-active");
      popupConfirmation.setAttribute("data-confirm-type", "");
   }

   /**
    * Button control for pop-up confirmation button Ok.
    *
    * @returns {HTMLButtonElement} the button element.
    */
   if (event.target.closest("#popup__button-Ok") && popupConfirmation.dataset.confirmType === "Product") {
      deleteProduct();
      popupConfirmation.classList.remove("js-active");
      popupConfirmation.setAttribute("data-confirm-type", "");
   }

   /**
    * Button control for pop-up confirmation button Cancel.
    *
    * @returns {HTMLButtonElement} the button element.
    */
   if (event.target.closest("#popup__button-cancel")) {
      popupConfirmation.classList.remove("js-active");
      popupConfirmation.setAttribute("data-confirm-type", "");
   }
});

/**
 * Shows a message that nothing was found for this query.
 */
function showMessageNothingFound() {
   popupNotfound.classList.add("js-active");
   popupButtonNotfound.addEventListener("click", () => popupNotfound.classList.remove("js-active"));
}

/**
 * Shows a message that not all form fields are filled.
 */
function fillInput() {
   popupFillinput.classList.add("js-active");
   popupButtonFillinput.addEventListener("click", () => popupFillinput.classList.remove("js-active"));
}

/**
 * Search for stores under different conditions.
 *
 * @returns {HTMLButtonElement} the button element.
 */
searchButtonSerch.addEventListener("click", () => {
   if (searchItem.value != "") {
      getSearchStores(searchItem.value);
   }
});

/**
 * Search for stores under different conditions with keydown "Enter" or "NumpadEnter".
 *
 * @returns {HTMLButtonElement} the button element.
 */
searchItem.addEventListener('keydown', event => {
   if (event.code === "Enter" || event.code === "NumpadEnter") {
      event.preventDefault();
      getSearchStores(searchItem.value);
   }
});

/**
 * Resets the parameters for searching for stores and re-requests the list of products.
 *
 * @returns {HTMLButtonElement} the button element.
 */
searchButtonReserch.addEventListener("click", () => {
   getStores(createStoresList);
   searchItem.value = "";
});

/**
 * Gets the correct address to show the modified or created product.
 */
function getRightURLtoShowProduct() {
   if (productsSearchItem.value != "" && document.querySelector("[data-button-status-ok]").dataset.buttonStatusOk === "OK") {
      getStatusSearchProducts(productsSearchItem.value, storeId, document.querySelector("[data-button-status-ok]").dataset.buttonStatusOk);
   } else if (productsSearchItem.value != "" && document.querySelector("[data-button-status-storage]").dataset.buttonStatusStorage === "STORAGE") {
      getStatusSearchProducts(productsSearchItem.value, storeId, document.querySelector("[data-button-status-storage]").dataset.buttonStatusStorage);
   } else if (productsSearchItem.value != "" && document.querySelector("[data-button-status-outstok]").dataset.buttonStatusOutstok === "OUT_OF_STOCK") {
      getStatusSearchProducts(productsSearchItem.value, storeId, document.querySelector("[data-button-status-outstok]").dataset.buttonStatusOutstok);
   } else if (productsSearchItem.value != "") {
      getSearchProducts(productsSearchItem.value, storeId);
   } else if (productsSearchItem.value == "" && document.querySelector("[data-button-status-ok]").dataset.buttonStatusOk === "OK") {
      getStatusProduct(storeId, document.querySelector("[data-button-status-ok]").dataset.buttonStatusOk);
   } else if (productsSearchItem.value == "" && document.querySelector("[data-button-status-storage]").dataset.buttonStatusStorage === "STORAGE") {
      getStatusProduct(storeId, document.querySelector("[data-button-status-storage]").dataset.buttonStatusStorage);
   } else if (productsSearchItem.value == "" && document.querySelector("[data-button-status-outstok]").dataset.buttonStatusOutstok === "OUT_OF_STOCK") {
      getStatusProduct(storeId, document.querySelector("[data-button-status-outstok]").dataset.buttonStatusOutstok);
   } else if (productsSearchItem.value == "") {
      getProducts(storeId, createStoreProducts);
   }
}

/**
 * Search for products under different conditions.
 *
 * @returns {HTMLButtonElement} the button element.
 */
productsSearchButton.addEventListener("click", () => {

   if (productsSearchItem.value != "" && document.querySelector("[data-button-status-ok]").dataset.buttonStatusOk === "OK") {
      getStatusSearchProducts(productsSearchItem.value, storeId, document.querySelector("[data-button-status-ok]").dataset.buttonStatusOk);
      getSearchInfoProducts(productsSearchItem.value, storeId);
   } else if (productsSearchItem.value != "" && document.querySelector("[data-button-status-storage]").dataset.buttonStatusStorage === "STORAGE") {
      getStatusSearchProducts(productsSearchItem.value, storeId, document.querySelector("[data-button-status-storage]").dataset.buttonStatusStorage);
      getSearchInfoProducts(productsSearchItem.value, storeId);
   } else if (productsSearchItem.value != "" && document.querySelector("[data-button-status-outstok]").dataset.buttonStatusOutstok === "OUT_OF_STOCK") {
      getStatusSearchProducts(productsSearchItem.value, storeId, document.querySelector("[data-button-status-outstok]").dataset.buttonStatusOutstok);
      getSearchInfoProducts(productsSearchItem.value, storeId);
   } else {
      getSearchProducts(productsSearchItem.value, storeId);
   }

   document.querySelectorAll("[data-sort-type]").forEach(dataPropName => {
      dataPropName.innerText = "☰";
   });
});

/**
 * Resets the parameters for searching for products and re-requests the list of products.
 *
 * @returns {HTMLButtonElement} the button element.
 */
productsReSearchButton.addEventListener("click", () => {
   getProducts(storeId, createStoreProducts);
   productsSearchItem.value = "";
   sortButtonQSAll.forEach(button => button.classList.remove("js-active-backround-border"));
   document.querySelector("[data-button-status-all]").classList.add("js-active-backround-border");
   document.querySelectorAll("[data-sort-type]").forEach(dataPropName => {
      dataPropName.innerText = "☰";
   });
});

/**
 * Adds and removes the necessary attributes when clicking on button "status All".
 *
 * @returns {HTMLButtonElement} the button element.
 */
document.querySelector("[data-button-status-all]").addEventListener("click", () => {
   document.querySelector("[data-button-status-ok]").setAttribute("data-button-status-ok", "");
   document.querySelector("[data-button-status-storage]").setAttribute("data-button-status-storage", "");
   document.querySelector("[data-button-status-outstok]").setAttribute("data-button-status-outstok", "");
   document.querySelector("[data-button-status-all]").setAttribute("data-button-status-all", "ALL");
   document.querySelectorAll("[data-sort-type]").forEach(dataPropName => {
      dataPropName.innerText = "☰";
   });
   if (productsSearchItem.value != "" && document.querySelector("[data-button-status-all]").dataset.buttonStatusAll === "ALL") {
      getSearchProducts(productsSearchItem.value, storeId);
   } else {
      getProducts();
   }
});

/**
 * Adds and removes the necessary attributes when clicking on button "status Ok".
 *
 * @returns {HTMLButtonElement} the button element.
 */
document.querySelector("[data-button-status-ok]").addEventListener("click", () => {
   document.querySelector("[data-button-status-ok]").setAttribute("data-button-status-ok", "OK");
   document.querySelector("[data-button-status-storage]").setAttribute("data-button-status-storage", "");
   document.querySelector("[data-button-status-outstok]").setAttribute("data-button-status-outstok", "");
   document.querySelector("[data-button-status-all]").setAttribute("data-button-status-all", "");
   document.querySelectorAll("[data-sort-type]").forEach(dataPropName => {
      dataPropName.innerText = "☰";
   });
   if (productsSearchItem.value != "" && document.querySelector("[data-button-status-ok]").dataset.buttonStatusOk === "OK") {
      getStatusSearchProducts(productsSearchItem.value, storeId, document.querySelector("[data-button-status-ok]").dataset.buttonStatusOk);
   } else {
      getStatusProduct(storeId, document.querySelector("[data-button-status-ok]").dataset.buttonStatusOk);
   }
});

/**
 * Adds and removes the necessary attributes when clicking on button "status Storage".
 *
 * @returns {HTMLButtonElement} the button element.
 */
document.querySelector("[data-button-status-storage]").addEventListener("click", () => {
   document.querySelector("[data-button-status-ok]").setAttribute("data-button-status-ok", "");
   document.querySelector("[data-button-status-storage]").setAttribute("data-button-status-storage", "STORAGE");
   document.querySelector("[data-button-status-outstok]").setAttribute("data-button-status-outstok", "");
   document.querySelector("[data-button-status-all]").setAttribute("data-button-status-all", "");
   document.querySelectorAll("[data-sort-type]").forEach(dataPropName => {
      dataPropName.innerText = "☰";
   });
   if (productsSearchItem.value != "" && document.querySelector("[data-button-status-storage]").dataset.buttonStatusStorage === "STORAGE") {
      getStatusSearchProducts(productsSearchItem.value, storeId, document.querySelector("[data-button-status-storage]").dataset.buttonStatusStorage);
   } else {
      getStatusProduct(storeId, document.querySelector("[data-button-status-storage]").dataset.buttonStatusStorage);
   }
});

/**
 * Adds and removes the necessary attributes when clicking on button "status Out of stock".
 *
 * @returns {HTMLButtonElement} the button element.
 */
document.querySelector("[data-button-status-outstok]").addEventListener("click", () => {
   document.querySelector("[data-button-status-ok]").setAttribute("data-button-status-ok", "");
   document.querySelector("[data-button-status-storage]").setAttribute("data-button-status-storage", "");
   document.querySelector("[data-button-status-outstok]").setAttribute("data-button-status-outstok", "OUT_OF_STOCK");
   document.querySelector("[data-button-status-all]").setAttribute("data-button-status-all", "");
   document.querySelectorAll("[data-sort-type]").forEach(dataPropName => {
      dataPropName.innerText = "☰";
   });
   if (productsSearchItem.value != "" && document.querySelector("[data-button-status-outstok]").dataset.buttonStatusOutstok === "OUT_OF_STOCK") {
      getStatusSearchProducts(productsSearchItem.value, storeId, document.querySelector("[data-button-status-outstok]").dataset.buttonStatusOutstok);
   } else {
      getStatusProduct(storeId, document.querySelector("[data-button-status-outstok]").dataset.buttonStatusOutstok);
   }
});

/**
 * Sort for products under different conditions.
 *
 * @param {*} event the current sort button. 
 * 
 * @returns {HTMLButtonElement} the button element.
 */
tableRownames.addEventListener("click", event => {
   let curDataSetName = (event.target.closest("[data-prop-name]").dataset.propName).toLowerCase().slice(0, 6);
   let curSortIdButton = `#${curDataSetName}-table__sort-button`;
   let tableSortButton = document.querySelector(curSortIdButton);
   let currentPropertyName;
   let currentSortType;

   document.querySelectorAll("[data-sort-type]").forEach(dataPropName => {
      dataPropName.innerText = "☰";
   });

   if (event.target.dataset.sortType === "NONE") {
      document.querySelectorAll("[data-sort-type]").forEach(dataSortType => {
         dataSortType.setAttribute("data-sort-type", "NONE");
      });
      currentPropertyName = event.target.closest("[data-prop-name]").dataset.propName;
      currentSortType = "ASC";
      tableSortButton.innerText = "⬆";
      tableSortButton.setAttribute("data-sort-type", "ASC");

      if (productsSearchItem.value != "" && document.querySelector("[data-button-status-ok]").dataset.buttonStatusOk === "OK") {
         getSortStatusSearchProducts(productsSearchItem.value, storeId, document.querySelector("[data-button-status-ok]").dataset.buttonStatusOk, currentPropertyName, currentSortType);
      } else if (productsSearchItem.value != "" && document.querySelector("[data-button-status-storage]").dataset.buttonStatusStorage === "STORAGE") {
         getSortStatusSearchProducts(productsSearchItem.value, storeId, document.querySelector("[data-button-status-storage]").dataset.buttonStatusStorage, currentPropertyName, currentSortType);
      } else if (productsSearchItem.value != "" && document.querySelector("[data-button-status-outstok]").dataset.buttonStatusOutstok === "OUT_OF_STOCK") {
         getSortStatusSearchProducts(productsSearchItem.value, storeId, document.querySelector("[data-button-status-outstok]").dataset.buttonStatusOutstok, currentPropertyName, currentSortType);
      } else if (productsSearchItem.value != "") {
         getSortSearchProduct(storeId, currentPropertyName, currentSortType, productsSearchItem.value)
      } else if (productsSearchItem.value == "" && document.querySelector("[data-button-status-ok]").dataset.buttonStatusOk === "OK") {
         getSortStatusProduct(storeId, document.querySelector("[data-button-status-ok]").dataset.buttonStatusOk, currentPropertyName, currentSortType);
      } else if (productsSearchItem.value == "" && document.querySelector("[data-button-status-storage]").dataset.buttonStatusStorage === "STORAGE") {
         getSortStatusProduct(storeId, document.querySelector("[data-button-status-storage]").dataset.buttonStatusStorage, currentPropertyName, currentSortType);
      } else if (productsSearchItem.value == "" && document.querySelector("[data-button-status-outstok]").dataset.buttonStatusOutstok === "OUT_OF_STOCK") {
         getSortStatusProduct(storeId, document.querySelector("[data-button-status-outstok]").dataset.buttonStatusOutstok, currentPropertyName, currentSortType);
      } else {
         getSortProducts(storeId, currentPropertyName, currentSortType);
      }
   }
   else if (event.target.dataset.sortType === "ASC") {
      currentPropertyName = event.target.closest("[data-prop-name]").dataset.propName;
      currentSortType = "DESC";
      tableSortButton.innerText = "⬇";
      tableSortButton.setAttribute("data-sort-type", "DESC");

      if (productsSearchItem.value != "" && document.querySelector("[data-button-status-ok]").dataset.buttonStatusOk === "OK") {
         getSortStatusSearchProducts(productsSearchItem.value, storeId, document.querySelector("[data-button-status-ok]").dataset.buttonStatusOk, currentPropertyName, currentSortType);
      } else if (productsSearchItem.value != "" && document.querySelector("[data-button-status-storage]").dataset.buttonStatusStorage === "STORAGE") {
         getSortStatusSearchProducts(productsSearchItem.value, storeId, document.querySelector("[data-button-status-storage]").dataset.buttonStatusStorage, currentPropertyName, currentSortType);
      } else if (productsSearchItem.value != "" && document.querySelector("[data-button-status-outstok]").dataset.buttonStatusOutstok === "OUT_OF_STOCK") {
         getSortStatusSearchProducts(productsSearchItem.value, storeId, document.querySelector("[data-button-status-outstok]").dataset.buttonStatusOutstok, currentPropertyName, currentSortType);
      } else if (productsSearchItem.value != "") {
         getSortSearchProduct(storeId, currentPropertyName, currentSortType, productsSearchItem.value)
      } else if (productsSearchItem.value == "" && document.querySelector("[data-button-status-ok]").dataset.buttonStatusOk === "OK") {
         getSortStatusProduct(storeId, document.querySelector("[data-button-status-ok]").dataset.buttonStatusOk, currentPropertyName, currentSortType);
      } else if (productsSearchItem.value == "" && document.querySelector("[data-button-status-storage]").dataset.buttonStatusStorage === "STORAGE") {
         getSortStatusProduct(storeId, document.querySelector("[data-button-status-storage]").dataset.buttonStatusStorage, currentPropertyName, currentSortType);
      } else if (productsSearchItem.value == "" && document.querySelector("[data-button-status-outstok]").dataset.buttonStatusOutstok === "OUT_OF_STOCK") {
         getSortStatusProduct(storeId, document.querySelector("[data-button-status-outstok]").dataset.buttonStatusOutstok, currentPropertyName, currentSortType);
      } else {
         getSortProducts(storeId, currentPropertyName, currentSortType);
      }
   }
   else if (event.target.dataset.sortType === "DESC") {
      tableSortButton.innerText = "☰";
      tableSortButton.setAttribute("data-sort-type", "NONE");

      if (productsSearchItem.value != "" && document.querySelector("[data-button-status-ok]").dataset.buttonStatusOk === "OK") {
         getStatusSearchProducts(productsSearchItem.value, storeId, document.querySelector("[data-button-status-ok]").dataset.buttonStatusOk);
      } else if (productsSearchItem.value != "" && document.querySelector("[data-button-status-storage]").dataset.buttonStatusStorage === "STORAGE") {
         getStatusSearchProducts(productsSearchItem.value, storeId, document.querySelector("[data-button-status-storage]").dataset.buttonStatusStorage);
      } else if (productsSearchItem.value != "" && document.querySelector("[data-button-status-outstok]").dataset.buttonStatusOutstok === "OUT_OF_STOCK") {
         getStatusSearchProducts(productsSearchItem.value, storeId, document.querySelector("[data-button-status-outstok]").dataset.buttonStatusOutstok);
      } else if (productsSearchItem.value != "") {
         getSearchProducts(productsSearchItem.value, storeId);
      } else if (productsSearchItem.value == "" && document.querySelector("[data-button-status-ok]").dataset.buttonStatusOk === "OK") {
         getStatusProduct(storeId, document.querySelector("[data-button-status-ok]").dataset.buttonStatusOk);
      } else if (productsSearchItem.value == "" && document.querySelector("[data-button-status-storage]").dataset.buttonStatusStorage === "STORAGE") {
         getStatusProduct(storeId, document.querySelector("[data-button-status-storage]").dataset.buttonStatusStorage);
      } else if (productsSearchItem.value == "" && document.querySelector("[data-button-status-outstok]").dataset.buttonStatusOutstok === "OUT_OF_STOCK") {
         getStatusProduct(storeId, document.querySelector("[data-button-status-outstok]").dataset.buttonStatusOutstok);
      } else if (productsSearchItem.value == "") {
         getProducts(storeId, createStoreProducts);
      }
   }
});

/**
 * Button control for "Hide-Show-Fix" of the stores side.
 *
 * @returns {HTMLButtonElement} the button element.
 */
buttonHideshowList.addEventListener("click", event => {
   if (event.target.closest(".button__up-list")) {
      storesSearch.classList.add("js-hide");
      buttonUpList.classList.add("js-hide");
      buttonFixList.classList.add("js-hide");
      buttonDownList.classList.add("js-active");
   }
   if (event.target.closest(".button__down-list")) {
      storesSearch.classList.remove("js-hide");
      buttonUpList.classList.remove("js-hide");
      buttonFixList.classList.remove("js-hide");
      buttonDownList.classList.remove("js-active");
   }
   if (event.target.closest(".button__fix-list")) {
      storesSearch.classList.toggle("js-stores__search-fix");
      buttonHideshowList.classList.toggle("js-button__hideshow_list-fix");
      buttonFixList.classList.toggle("js-active-backround");
   }
   if (buttonFixList.classList.contains("js-active-backround")) {
      buttonUpList.classList.remove("button__up-list");
   } else {
      buttonUpList.classList.add("button__up-list");
   }
});

/**
 * Button control for "Hide-Show-Fix" of the products side.
 *
 * @returns {HTMLButtonElement} the button element.
 */
buttonHideshowDetails.addEventListener("click", event => {
   if (event.target.closest(".button__up-details")) {
      detailsInfo.classList.add("js-hide");
      buttonUpDetails.classList.add("js-hide");
      buttonFixDetails.classList.add("js-hide");
      buttonDownDetails.classList.add("js-active");
   }
   if (event.target.closest(".button__down-details")) {
      detailsInfo.classList.remove("js-hide");
      buttonUpDetails.classList.remove("js-hide");
      buttonFixDetails.classList.remove("js-hide");
      buttonDownDetails.classList.remove("js-active");
   }
   if (event.target.closest(".button__fix-details")) {
      detailsInfo.classList.toggle("js-details__info-fix");
      buttonHideshowDetails.classList.toggle("js-button__hideshow_det-fix");
      buttonFixDetails.classList.toggle("js-active-backround");
      tableRownames.classList.toggle("js-table__rownames-fix");
   }
   if (buttonFixDetails.classList.contains("js-active-backround")) {
      buttonUpDetails.classList.remove("button__up-details");
   } else {
      buttonUpDetails.classList.add("button__up-details");
   }
});

/**
 * Сonverts the date to the correct format.
 *
 * @param {string} stores store list.
 * 
 * @returns {string} date in the correct format.
 *
 * @public
 */
function transformDate(parameterDate) {
   let date = new Date(parameterDate);
   let optionsDate = {
      month: "short",
      day: "numeric",
      year: "numeric"
   }
   return date.toLocaleString("en-US", optionsDate);
}

/**
 * Get the current store information.
 * 
 * @param {number} countAll the store id.
 *
 * @public
 */
function showSortProductInfo(countAll) {
   let countOut = countAll.filter(product => product.Status === "OUT_OF_STOCK");
   let countOk = countAll.filter(product => product.Status === "OK");
   let countStor = countAll.filter(product => product.Status === "STORAGE");
   buttonCountAll.innerHTML = `<p title="${countAll.length}"> ${countAll.length}</p>`;
   buttonCountOut.innerHTML = `<p title="${countOut.length}">${countOut.length}</p>`;
   buttonCountOk.innerHTML = `<p title="${countOk.length}">${countOk.length}</p>`;
   buttonCountStor.innerHTML = `<p title="${countStor.length}">${countStor.length}</p>`;
}

/**
 * Show background for current status button.
 */
for (let currentStatusButton of sortButtonQSAll) {
   currentStatusButton.addEventListener("click", function () {
      sortButtonQSAll.forEach(button => button.classList.remove("js-active-backround-border"));
      this.classList.toggle("js-active-backround-border");
   });
};

/**
 * Render store list.
 *
 * @param {Object[]} stores the array of stores.
 *
 * @return {View} self object.
 */
function renderStoresList(stores) {
   return stores.map(store =>
      `<li class="store-list__item" id="store-list__item" data-store-id="${store.id}" title="Click to show 'Store Details'">
      <div class="item__store">
         <h3 class="store__name" id="store__name" title="${store.Name}">${store.Name}</h3>
         <span class="store__addres" title="${store.Address}">${store.Address}</span>
      </div>
      <div class="item__distance">
         <p class="distance__num" title="${store.FloorArea}">${store.FloorArea}</p>
         <p class="distance__str">
            sq.m
         </p>
      </div>
   </li>`
   ).join("");
}

/**
   * Render information field.
   *
   * @param {Object[]} selectedStore the array of selected store.
   * 
   * @return {View} self object.
   */
function renderInformationField(selectedStore) {
   return selectedStore.map(store =>
      `<div class="details__info-inner" data-store-id="${store.id}">
         <p class="info__item">
            <span class="item__name">Email:</span>
            <span class="item__content" title="${store.Email}">${store.Email}</span>
         </p>
         <p class="info__item">
            <span class="item__name">Phone Number:</span>
            <span class="item__content" title="${store.PhoneNumber}">${store.PhoneNumber}</span>
         </p>
         <p class="info__item">
            <span class="item__name">Address:</span>
            <span class="item__content" title="${store.Address}">${store.Address}</span>
         </p>
      </div>
      <div class="details__info-inner" data-store-id="${store.id}">
         <p class="info__item">
            <span class="item__name">Established Date:</span>
            <span class="item__content" title="${transformDate(store.Established)}">${transformDate(store.Established)}</span>
         </p>
         <p class="info__item">
            <span class="item__name">Floor Area:</span>
            <span class="item__content" title="${store.FloorArea}">${store.FloorArea}</span>
         </p>
      </div>`
   ).join("");
}

/**
    * Render product table.
    *
    * @param {Object[]} products the array of products.
    * 
    * @return {View} self object.
    */
function renderProductTable(products) {
   return products.map((product, index) =>
      `<div class="table__content" data-store-id="${product.StoreId}" data-product-id="${product.id}">
         <div class="table__item table__name">
            <p class="name__text" title="${product.Name}">${product.Name}</p>
         </div>
         <div class="table__item table__price">
            <p class="price__num" title="${product.Price} USD">${product.Price} <span class="price__text">USD</span></p>
         </div>
         <div class="table__item table__specs">
            <p class="specs__text" title="${product.Specs}">${product.Specs}</p>
         </div>
         <div class="table__item table__supinfo">
            <p class="supinfo__text" title="${product.SupplierInfo}">${product.SupplierInfo}</p>
         </div>
         <div class="table__item table__country">
            <p class="country__text" title="${product.MadeIn}">${product.MadeIn}</p>
         </div>
         <div class="table__item table__company">
            <p class="company__text" title="${product.ProductionCompanyName}">${product.ProductionCompanyName}</p>
         </div>
         <div class="table__item table__rating">
            <div class="rating">
               <div class="rating__items">
                  <input id="rating__5${index + 1}" type="radio" class="rating__item" name="rating${index + 1}" ${product.Rating === 5 ? "checked" : ""} value="5">
                  <label for="rating__5${index + 1}" class="rating__label"></label>
                  <input id="rating__4${index + 1}" type="radio" class="rating__item" name="rating${index + 1}" ${product.Rating === 4 ? "checked" : ""} value="4">
                  <label for="rating__4${index + 1}" class="rating__label"></label>
                  <input id="rating__3${index + 1}" type="radio" class="rating__item" name="rating${index + 1}" ${product.Rating === 3 ? "checked" : ""} value="3">
                  <label for="rating__3${index + 1}" class="rating__label"></label>
                  <input id="rating__2${index + 1}" type="radio" class="rating__item" name="rating${index + 1}" ${product.Rating === 2 ? "checked" : ""} value="2">
                  <label for="rating__2${index + 1}" class="rating__label"></label>
                  <input id="rating__1${index + 1}" type="radio" class="rating__item" name="rating${index + 1}" ${product.Rating === 1 ? "checked" : ""} value="1">
                  <label for="rating__1${index + 1}" class="rating__label"></label>
               </div>
            </div>
         </div>
         <div class="table__item table__button-edit" data-button-edit title="Edit product information">
            <p class="button-edit__text">&#9998;</p>
         </div>
         <div class="table__item table__delete" data-button-delete title="Delete product">
            <div class="table__delete-inner">
               <p class="delete__text">&#10006;</p>
            </div>
         </div>
      </div>`
   ).join("");
}

