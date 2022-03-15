const API_URL = "http://localhost:3000/api";
const STORES_API_URL = "/Stores";
const STORES_DELETE_API_URL = `${STORES_API_URL}/{{storeId}}`;
const STORES_SEARCH_API_URL = `${STORES_API_URL}?filter={"where":{"or":[{"Name":{"regexp":"^value/gi"}},{"Address":{"regexp":"^value/gi"}},{"FloorArea":{"like":"value"}}]}}`;
const PRODUCTS_API_URL = `${STORES_API_URL}/{{storeId}}/rel_Products`;
const PRODUCTS_DELETE_API_URL = `${PRODUCTS_API_URL}/{{productId}}`;
const PRODUCTS_EDIT_API_URL = `${PRODUCTS_API_URL}/{{productId}}`;
const PRODUCTS_SEARCH_API_URL = `${PRODUCTS_API_URL}?filter={"where":{"or":[{"Name":{"regexp":"^value/gi"}},{"Price":{"like":"value"}},{"Specs":{"regexp":"^value/gi"}},{"Rating":{"like":"value"}},{"SupplierInfo":{"regexp":"^value/gi"}},{"MadeIn":{"regexp":"^value/gi"}},{"ProductionCompanyName":{"regexp":"^value/gi"}}]}}`;
const PRODUCTS_SORT_API_URL = `${PRODUCTS_API_URL}?filter={"order":"{{propertyName}} {{sortType}}"}`;
const PRODUCTS_SORT_SEARCH_NAME_API_URL = `${PRODUCTS_API_URL}?filter={"where":{"or":[{"Name":{"regexp":"^value/gi"}},{"Price":{"like":"value"}},{"Specs":{"regexp":"^value/gi"}},{"Rating":{"like":"value"}},{"SupplierInfo":{"regexp":"^value/gi"}},{"MadeIn":{"regexp":"^value/gi"}},{"ProductionCompanyName":{"regexp":"^value/gi"}}]},"order":"{{propertyName}} {{sortType}}"}`;
const PRODUCTS_STATUS_API_URL = `${PRODUCTS_API_URL}?filter={"where":{"Status":"{{statusVal}}"}}`;
const PRODUCTS_STATUS_SEARCH_API_URL = `${PRODUCTS_API_URL}?filter={"where":{"and":[{"Status":"{{statusVal}}"},{"or":[{"Name":{"regexp":"^value/gi"}},{"Price":{"like":"value"}},{"Specs":{"regexp":"^value/gi"}},{"Rating":{"like":"value"}},{"SupplierInfo":{"regexp":"^value/gi"}},{"MadeIn":{"regexp":"^value/gi"}},{"ProductionCompanyName":{"regexp":"^value/gi"}}]}]}}`;
const PRODUCTS_SORT_STATUS_API_URL = `${PRODUCTS_API_URL}?filter={"where":{"Status":"{{statusVal}}"},"order":"{{propertyName}} {{sortType}}"}`;
const PRODUCTS_SORT_STATUS_SEARCH_API_URL = `${PRODUCTS_API_URL}?filter={"where":{"and":[{"Status":"{{statusVal}}"},{"or":[{"Name":{"regexp":"^value/gi"}},{"Price":{"like":"value"}},{"Specs":{"regexp":"^value/gi"}},{"Rating":{"like":"value"}},{"SupplierInfo":{"regexp":"^value/gi"}},{"MadeIn":{"regexp":"^value/gi"}},{"ProductionCompanyName":{"regexp":"^value/gi"}}]}]},"order":"{{propertyName}} {{sortType}}"}`;

/**
    * Fetch the stores list.
    *
    * @returns {Promise} the promise object will be resolved when DOMContentLoaded.
    *
    * @public
    */
function getStores() {
   fetch(`${API_URL}${STORES_API_URL}`)
      .then(response => response.json())
      .then(stores => createStoresList(stores))
      .catch((error) => {
         console.log("Error: ", error);
      });
};

/**
    * Fetch the products list.
    *
    * @returns {Promise} the promise object will be resolved when user select store.
    *
    * @public
    */
function getProducts() {
   const productsAPI = PRODUCTS_API_URL.replace("{{storeId}}", storeId);
   fetch(`${API_URL}${productsAPI}`)
      .then(response => response.json())
      .then(products => {
         createStoreProducts(products);
         showSortProductInfo(products);
      })
      .catch((error) => {
         console.log("Error: ", error);
      });
};

/**
    * Fetch the stores according to the entered data.
    *
    * @param {string} value of the entered data.
    *  
    * @returns {Promise} the promise object will be resolved with search result.
    *
    * @public
    */
function getSearchStores(value) {
   const searchStoresAPI = STORES_SEARCH_API_URL.replace(/value/gi, value);
   fetch(`${API_URL}${searchStoresAPI}`)
      .then(response => response.json())
      .then(foundStores => {
         if (foundStores.length == 0) {
            showMessageNothingFound();
         } else {
            createStoresList(foundStores);
         }
      })
      .catch((error) => {
         console.log("Error: ", error);
      });
}

/**
    * Fetch the products according to the entered data.
    *
    * @param {string} value of the entered data.
    *  
    * @param {number} storeId the store id. 
    * 
    * @returns {Promise} the promise object will be resolved with search result.
    *
    * @public
    */
function getSearchProducts(value, storeId) {
   const searchProductsAPI = PRODUCTS_SEARCH_API_URL.replace(/value/gi, value).replace("{{storeId}}", storeId);
   fetch(`${API_URL}${searchProductsAPI}`)
      .then(response => response.json())
      .then(foundProducts => {
         if (foundProducts.length == 0) {
            showMessageNothingFound();
         } else {
            createStoreProducts(foundProducts);
            showSortProductInfo(foundProducts);
         }
      })
      .catch((error) => {
         console.log("Error: ", error);
      });
}

/**
    * Fetch the statuses of searched products according the entered data.
    *
    * @param {string} value of the entered data. 
    *  
    * @param {number} storeId the store id. 
    *  
    * @returns {Promise} the promise object will be resolved with the information about statuses of searched products from API according the entered data.
    *
    * @public
    */
function getSearchInfoProducts(value, storeId) {
   const searchInfoProductsAPI = PRODUCTS_SEARCH_API_URL.replace(/value/gi, value).replace("{{storeId}}", storeId);
   fetch(`${API_URL}${searchInfoProductsAPI}`)
      .then(response => response.json())
      .then(foundInfoProducts => showSortProductInfo(foundInfoProducts))
      .catch((error) => {
         console.log("Error: ", error);
      });
}

/**
    * Fetch the products according to the status and the entered data.
    *
    * @param {string} value of the entered data.
    * 
    * @param {number} storeId the store id. 
    * 
    * @param {string} status of the products.
    *  
    * @returns {Promise} the promise object will be resolved with products according to the status and the entered data.
    *
    * @public
    */
function getStatusSearchProducts(value, storeId, status) {
   const statusSearchProductsAPI = PRODUCTS_STATUS_SEARCH_API_URL.replace(/value/gi, value).replace("{{storeId}}", storeId).replace("{{statusVal}}", status);
   fetch(`${API_URL}${statusSearchProductsAPI}`)
      .then(response => response.json())
      .then(statusSerchProducts => {
         if (statusSerchProducts.length == 0) {
            showMessageNothingFound();
         } else {
            createStoreProducts(statusSerchProducts);
         }
      })
      .catch((error) => {
         console.log("Error: ", error);
      });
}

/**
    * Fetch the products according to the status.
    * 
    * @param {number} storeId the store id. 
    * 
    * @param {string} status of the products.
    *  
    * @returns {Promise} the promise object will be resolved with products according to the status.
    *
    * @public
    */
function getStatusProduct(storeId, status) {
   const statusProductsAPI = PRODUCTS_STATUS_API_URL.replace("{{storeId}}", storeId).replace("{{statusVal}}", status);
   fetch(`${API_URL}${statusProductsAPI}`)
      .then(response => response.json())
      .then(statusProducts => createStoreProducts(statusProducts))
      .catch((error) => {
         console.log("Error: ", error);
      });
}

/**
    * Fetch the sorted products according the sort type. 
    *  
    * @param {number} storeId the store id.
    * 
    * @param {string} currentPropertyName the name of the column to sort by.
    * 
    * @param {string} currentSortType the sort type.   
    *  
    * @returns {Promise} the promise object will be resolved with the sorted products.
    *
    * @public
    */
function getSortProducts(storeId, currentPropertyName, currentSortType) {
   const sortProductsAPI = PRODUCTS_SORT_API_URL.replace("{{storeId}}", storeId).replace("{{propertyName}}", currentPropertyName).replace("{{sortType}}", currentSortType);
   fetch(`${API_URL}${sortProductsAPI}`)
      .then(response => response.json())
      .then(sortedProducts => createStoreProducts(sortedProducts))
      .catch((error) => {
         console.log("Error: ", error);
      });
}

/**
    * Fetch the sorted and searched products according the sort type and the entered data. 
    *  
    * @param {number} storeId the store id.
    * 
    * @param {string} currentPropertyName the name of the column to sort by.
    * 
    * @param {string} currentSortType the sort type.
    * 
    * @param {string} value of the entered data.    
    *  
    * @returns {Promise} the promise object will be resolved with the sorted and searched products.
    *
    * @public
    */
function getSortSearchProduct(storeId, currentPropertyName, currentSortType, value) {
   const sortSearchProductsAPI = PRODUCTS_SORT_SEARCH_NAME_API_URL.replace(/value/gi, value).replace("{{storeId}}", storeId).replace("{{propertyName}}", currentPropertyName).replace("{{sortType}}", currentSortType);
   fetch(`${API_URL}${sortSearchProductsAPI}`)
      .then(response => response.json())
      .then(sortedProducts => createStoreProducts(sortedProducts))
      .catch((error) => {
         console.log("Error: ", error);
      });
}

/**
    * Fetch the sorted products with current status according the sort type and the selected status. 
    *  
    * @param {number} storeId the store id.
    * 
    * @param {string} status of the products. 
    * 
    * @param {string} currentPropertyName the name of the column to sort by.
    * 
    * @param {string} currentSortType the sort type.    
    *  
    * @returns {Promise} the promise object will be resolved with the sorted products with current status.
    *
    * @public
    */
function getSortStatusProduct(storeId, status, currentPropertyName, currentSortType) {
   const sortStatusProductsAPI = PRODUCTS_SORT_STATUS_API_URL.replace("{{storeId}}", storeId).replace("{{statusVal}}", status).replace("{{propertyName}}", currentPropertyName).replace("{{sortType}}", currentSortType);
   fetch(`${API_URL}${sortStatusProductsAPI}`)
      .then(response => response.json())
      .then(sortStatusProducts => createStoreProducts(sortStatusProducts))
      .catch((error) => {
         console.log("Error: ", error);
      });
}

/**
    * Fetch the sorted products with current status and searched value according the sort type and the selected status and the entered data. 
    * 
    * @param {string} value of the entered data. 
    *  
    * @param {number} storeId the store id.
    * 
    * @param {string} status of the products. 
    * 
    * @param {string} currentPropertyName the name of the column to sort by.
    * 
    * @param {string} currentSortType the sort type.    
    *  
    * @returns {Promise} the promise object will be resolved with the sorted products with current status and searched value.
    *
    * @public
    */
function getSortStatusSearchProducts(value, storeId, status, currentPropertyName, currentSortType) {
   const sortStatusSearchProductsAPI = PRODUCTS_SORT_STATUS_SEARCH_API_URL.replace(/value/gi, value).replace("{{storeId}}", storeId).replace("{{statusVal}}", status).replace("{{propertyName}}", currentPropertyName).replace("{{sortType}}", currentSortType);
   fetch(`${API_URL}${sortStatusSearchProductsAPI}`)
      .then(response => response.json())
      .then(sortStatusSerchProducts => {
         if (sortStatusSerchProducts.length == 0) {
            showMessageNothingFound();
         } else {
            createStoreProducts(sortStatusSerchProducts);
         }
      })
      .catch((error) => {
         console.log("Error: ", error);
      });
}

/**
    * POST the added new store to the server. 
    *  
    * @param {Object} newStore the new created store.
    * 
    * @public
    */
function addStore(newStore) {
   fetch(`${API_URL}${STORES_API_URL}`, {
      method: "POST",
      headers: {
         'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(newStore)
   })
      .then(getStores)
      .catch((error) => {
         console.log("Error: ", error);
      });
}

/**
    * POST the added new product to the server. 
    * 
    * @param {number} storeId the store id. 
    *  
    * @param {Object} newProduct the new created store.
    * 
    * @public
    */
function addProduct(newProduct) {
   const productsAPI = PRODUCTS_API_URL.replace("{{storeId}}", storeId);
   fetch(`${API_URL}${productsAPI}`, {
      method: "POST",
      headers: {
         'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(newProduct)
   })
      .then(getRightURLtoShowProduct)
      .catch((error) => {
         console.log("Error: ", error);
      });
}

/**
    * PUT the edited product to the server. 
    * 
    * @param {number} storeId the store id.
    * 
    * @param {number} productId the product id.  
    *  
    * @param {Object} newProduct the new created store.
    * 
    * @public
    */
function editProduct(newProduct) {
   const productEditAPI = PRODUCTS_EDIT_API_URL.replace("{{storeId}}", storeId).replace("{{productId}}", productId);
   fetch(`${API_URL}${productEditAPI}`, {
      method: "PUT",
      headers: {
         'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(newProduct)
   })
      .then(getRightURLtoShowProduct)
      .catch((error) => {
         console.log("Error: ", error);
      });
}

/**
    * Fetch the information about current product to fills in the form fields for editing product information. 
    * 
    * @param {number} storeId the store id.
    * 
    * @param {number} productId the product id.    
    *  
    * @returns {Promise} the promise object will be resolved with the information about current product.
    *
    * @public
    */
function getInfoFoEditProduct() {
   const productEditAPI = PRODUCTS_EDIT_API_URL.replace("{{storeId}}", storeId).replace("{{productId}}", productId);
   fetch(`${API_URL}${productEditAPI}`)
      .then(response => response.json())
      .then(product => fillEditProductForm(product))
      .catch((error) => {
         console.log("Error: ", error);
      });
}

/**
    * DELETE the store from the server. 
    * 
    * @param {number} storeId the store id.
    * 
    * @public
    */
function deleteStore() {
   const storeAPI = STORES_DELETE_API_URL.replace("{{storeId}}", storeId);
   fetch(`${API_URL}${storeAPI}`, {
      method: "DELETE"
   })
      .then(getStores)
      .catch((error) => {
         console.log("Error: ", error);
      });
}

/**
    * DELETE the product from the server. 
    * 
    * @param {number} storeId the store id.
    * 
    * @param {number} productId the product id.
    * 
    * @public
    */
function deleteProduct() {
   const productDelAPI = PRODUCTS_DELETE_API_URL.replace("{{storeId}}", storeId).replace("{{productId}}", productId);
   fetch(`${API_URL}${productDelAPI}`, {
      method: "DELETE"
   })
      .then(getRightURLtoShowProduct)
      .catch((error) => {
         console.log("Error: ", error);
      });
}

