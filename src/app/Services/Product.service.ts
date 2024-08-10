import { Injectable } from "@angular/core";

@Injectable({providedIn:"root"})
export class ProductService{


    vegetables:any[] = [
        {
            id : 1,
            name : "Big Onions",
            price : 170,
            quantity: "500g",
            category: "vegetable",
            image : "https://essstr.blob.core.windows.net/essimg/350x/Small/Pic914006.jpg"
        },
        {
            id : 2,
            name : "Coconut",
            price : 342,
            quantity: "3 pcs",
            category: "vegetable",
            image : "https://essstr.blob.core.windows.net/essimg/350x/Small/Pic912005.jpg"
        },
        {
            id : 3,
            name : "Potatoes",
            price : 260,
            quantity: "500g",
            category: "vegetable",
            image : "https://essstr.blob.core.windows.net/essimg/350x/Small/Pic915013.jpg"
        },
        {
            id :4,
            name : "Green Chillies",
            price : 72,
            quantity: "100g",
            category: "vegetable",
            image : "https://essstr.blob.core.windows.net/essimg/350x/Small/Pic914017.jpg"
        },
        {
            id : 5,
            name : "Pumpkin",
            price : 100,
            quantity: "500g",
            category: "vegetable",
            image : "https://essstr.blob.core.windows.net/essimg/350x/Small/Pic914039.jpg"
        },
        {
            id : 6,
            name : "Tomato",
            price : 180,
            quantity: "500g",
            category: "vegetable",
            image : "https://cargillsonline.com/VendorItems/MenuItems/VGE0254_1.jpg"
        },
        {
            id : 7,
            name : "Carrot",
            price : 300,
            quantity: "500g",
            category: "vegetable",
            popular: "popular",
            image : "https://essstr.blob.core.windows.net/essimg/350x/Small/Pic915007.jpg"
        },
        {
            id : 8,
            name : "Cabbage",
            price : 195,
            quantity: "500g",
            category: "vegetable",
            popular: "popular",
            image : "https://essstr.blob.core.windows.net/essimg/350x/Small/Pic915005.jpg"
        },
        {
            id : 9,
            name : "Brinjal",
            price : 77,
            quantity: "350g",
            category: "vegetable",
            image : "https://cargillsonline.com/VendorItems/MenuItems/VGE0439_1.jpg"
        },
        {
            id : 10,
            name : "Cucumber",
            price : 36,
            quantity: "400g",
            category: "vegetable",
            image : "https://cargillsonline.com/VendorItems/MenuItems/VGE0216_1.jpg"
        },
        {
            id : 11,
            name : "Leeks",
            price : 148,
            quantity: "250g",
            category: "vegetable",
            image : "https://essstr.blob.core.windows.net/essimg/350x/Small/Pic915011.jpg"
        },
        {
            id : 12,
            name : "Ladies Fingers",
            price : 53,
            quantity: "250g",
            category: "vegetable",
            image : "https://essstr.blob.core.windows.net/essimg/350x/Small/Pic914026.jpg"
        },
        {
            id : 13,
            name : "Green Beans",
            price : 195,
            quantity: "250g",
            category: "vegetable",
            image : "https://essstr.blob.core.windows.net/essimg/350x/Small/Pic915008.jpg"
        },
        {
            id : 14,
            name : "Red Onion",
            price : 148,
            quantity: "250g",
            category: "vegetable",
            image : "https://essstr.blob.core.windows.net/essimg/350x/Small/Pic914043.jpg"
        },
        {
            id : 15,
            name : "Lime",
            price : 230,
            quantity: "250g",
            category: "vegetable",
            image : "https://essstr.blob.core.windows.net/essimg/350x/Small/Pic914029.jpg"
        }
    ] 

    fruits: any[] = [
        {
            id : 50,
            name : "Apple - Red",
            price : 1386,
            quantity: "700g",
            category: "fruits",
            image : "https://essstr.blob.core.windows.net/essimg/350x/Small/Pic924007.jpg"
        },
        {
            id : 51,
            name : "Apple - Green",
            price : 1266,
            quantity: "700g",
            category: "fruits",
            image : "https://essstr.blob.core.windows.net/essimg/350x/Small/Pic924001.jpg"
        },
        {
            id : 52,
            name : "Papaya",
            price : 225,
            quantity: "1.25 Kg",
            category: "fruits",
            image : "https://essstr.blob.core.windows.net/essimg/350x/Small/Pic923072.jpg"
        },
    ]

    beverages: any[] = [
        {
            id : 200,
            name : "Viva Original Malted Food Drink Box - 400.00 g",
            price : 560,
            quantity: "400g",
            category: "beverages",
            popular: "popular",
            image : "https://cargillsonline.com/VendorItems/MenuItems/BV30304_1.jpg"
        },
        {
            id : 201,
            name : "Viva Malted Food Drink - 600.00 g",
            price : 689,
            quantity: "600g",
            category: "beverages",
            image : "https://cargillsonline.com/VendorItems/MenuItems/BVE0431_1.jpg"
        },
        {
            id : 202,
            name : "Kotmale Flavoured Milk Strawberry 170ml",
            price : 120,
            quantity: "170ml",
            category: "beverages",
            popular: "popular",
            image : "https://essstr.blob.core.windows.net/essimg/ItemAsset/Pic113471.jpg"
        },
        {
            id : 203,
            name : "Ambewela Full Cream Fresh Milk 1L",
            price : 550,
            quantity: "1L",
            category: "beverages",
            image : "https://essstr.blob.core.windows.net/essimg/ItemAsset/Pic13698.jpg"
        },
        {
            id : 204,
            name : "Anchor Uht Milk 1L",
            price : 560,
            quantity: "1L",
            category: "beverages",
            image : "https://essstr.blob.core.windows.net/essimg/ItemAsset/Pic113865.jpg"
        },

        {
            id : 205,
            name : "Milo Packet 400G + 40g",
            price : 890,
            quantity: "440g",
            category: "beverages",
            popular: "popular",
            image : "https://essstr.blob.core.windows.net/essimg/ItemAsset/Pic5125.jpg"
        },
        {
            id : 206,
            name : "Sprite Pet 1.5L",
            price : 400,
            quantity: "1.5L",
            category: "beverages",
            image : "https://essstr.blob.core.windows.net/essimg/ItemAsset/Pic120291.jpg"
        },

         {
            id : 207,
            name : "Elephant House Ginger Beer 1L",
            price : 270,
            quantity: "1L",
            category: "beverages",
            image : "https://essstr.blob.core.windows.net/essimg/ItemAsset/Pic116138.jpg"
        },
        {
            id : 208,
            name : "Elephant House Necto - 1.5L",
            price : 304,
            quantity: "1.5L",
            category: "beverages",
            image : "https://cargillsonline.com/VendorItems/MenuItems/BV93153_1.jpg"
        },
        {
            id : 209,
            name : "Kist Absolute Orange Juice - 1.00 l",
            price : 1120,
            quantity: "1.5L",
            category: "beverages",
            image : "https://cargillsonline.com/VendorItems/MenuItems/BV73105_1.jpg"
        },
        {
            id : 210,
            name : "Milo RTD Tetra Pack - 180.00 ml",
            price : 130,
            quantity: "180ml",
            category: "beverages",
            image : "https://cargillsonline.com/VendorItems/MenuItems/BV12901_1.jpg"
        },
        {
            id : 211,
            name : "Motha Rose Faluda Mix - 200.00 g",
            price : 242,
            quantity: "200g",
            category: "beverages",
            image : "https://cargillsonline.com/VendorItems/MenuItems/BV83401_1.jpg"
        },
        {
            id : 212,
            name : "Coca Cola-PET - 2.00L",
            price : 450,
            quantity: "2L",
            category: "beverages",
            popular: "popular",
            image : "https://cargillsonline.com/VendorItems/MenuItems/BV90635_1.jpg"
        },



        
    ]
    products:any[] = this.vegetables.concat(this.beverages,this.fruits);
}