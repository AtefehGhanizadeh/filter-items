

const searchInput=document.querySelector("input")

const productsContent=document.querySelector(".products-content")

const tagsDiv=document.querySelector(".tags")

let allProductsData=[]


const filters={

    search:"",
}

document.addEventListener("DOMContentLoaded" , ()=>{
    
    axios.get("http://localhost:3000/productsData").then(res=>{

        allProductsData=res.data

        renderProducts(allProductsData,filters)
    })
    .catch(err=>console.log(err))
}
)


function renderProducts(_products,_filters){

    const filteredProducts=_products.filter(product=>{

        return product.title.toLowerCase().includes(_filters.search.toLowerCase())
    })

    display(filteredProducts)
}

searchInput.addEventListener("input" , (e)=>{
    
    filters.search=e.target.value

    renderProducts(allProductsData,filters)

}
    
)


function display(filteredProducts){

    productsContent.innerHTML=""

    filteredProducts.forEach(product=>{

        const article=document.createElement("article")

        article.innerHTML=`
        <div class="product-image">
            <img src="${product.image}">
        </div>
        <div class="product-information">
            <span class="product-name">${product.title}</span>
            <span class="product-price">${product.price+"$"}</span>
        </div>`

        article.classList.add("product")

        productsContent.appendChild(article)


    })
}


tagsDiv.addEventListener("click" , e=>{

    
    target=e.target.dataset.filter
    

    if(target=="all" || target==undefined){

        display(allProductsData)
    }

    else{
    filteredProducts=allProductsData.filter(product=>product.title.includes(target))

    display(filteredProducts)
   }
})
