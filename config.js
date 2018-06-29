module.exports = {
    'secretKey': '12345-67890-09876-54321',
    'mongoUrl' : 'mongodb://localhost:27017/Application',
    'facebook': {
        clientId: '2017810365135727',
        clientSecret: '824f0cf4bcb1916487575d150c50af9f'
    }
}

/*
 http://localhost:3000/restaurants?is_open=1   >>>>>>>>>>>>> return is_open
 http://localhost:3000/restaurants?stars=5     >>>>>>>>>>>>> return most populated
 http://localhost:3000/restaurants?categories=Pizza >>>>>>>>>>>>>>>>>>>> return categories
 http://localhost:3000/restaurants?business_id=GYHaejDRFdUgyRm8X_g8rg  >>>>>> return specific restaurant
 http://localhost:3000/restaurants?name=Cafe Bon Appetit >>>>>>>>>>>>>>>> return restaurant with specific name
 http://localhost:3000/restaurants?longitude=-81.6774369&latitude=41.5011857 >>>>>>>>>>>>>>> nearby

 
 http://localhost:3000/menus?business_id=TW6A7M0j0R9hp1zYpxz2FQ >>>>>>>>>>>>>>. return menu of restaurant
 http://localhost:3000/menus?price=1 >>>>>>>>>>>>>>>>. $
 http://localhost:3000/menus?price=2 >>>>>>>>>>>>>>>>. $$
 http://localhost:3000/menus?price=3 >>>>>>>>>>>>>>>>. $$$
 http://localhost:3000/menus?rating=5 >>>>>>>>>>>>>. take any number from 1 to 5 
 all this return menu with restaurant with photos

 http://localhost:3000/orders >>>>>>>>>>>>>>>>>. it is post to store order 
   content    user_id , bussiness_id , order=[{dish_name , price}]

/////////////////////////////////////////////////////////////////////////////////////////////

 http://localhost:3000/reviews [post]
 ده شكل الجيسون الي هيتبعت 
{"business_id" : "YNI26xBkdOzI1TMGmIcEaw" , 
"user_id": "5b263ab8fc4bb713e4d68b00" , 
"stars" : 4 ,
"text" : "this is very beautiful restaurant" ,
"date": "2018-6-27"}

http://localhost:3000/favourite [post]
ده شكل الجيسون الي هيتبعت 
{"user_id" : "5b353cfeee34971bc0c030df" , 
    // المطعم
    "state": "OH",
    "address": "200 Euclid Ave",
    "attributes": "{'RestaurantsTableService': False, 'GoodForMeal': {'dessert': False, 'latenight': False, 'lunch': False, 'dinner': False, 'breakfast': False, 'brunch': False}, 'Alcohol': 'beer_and_wine', 'Caters': False, 'HasTV': True, 'RestaurantsGoodForGroups': True, 'NoiseLevel': 'average', 'WiFi': 'free', 'RestaurantsAttire': 'casual', 'RestaurantsReservations': False, 'OutdoorSeating': True, 'BusinessAcceptsCreditCards': True, 'RestaurantsPriceRange2': 1, 'BikeParking': False, 'RestaurantsDelivery': False, 'Ambience': {'romantic': False, 'intimate': False, 'classy': False, 'hipster': False, 'divey': False, 'touristy': False, 'trendy': False, 'upscale': False, 'casual': False}, 'RestaurantsTakeOut': True, 'GoodForKids': True, 'DriveThru': False, 'BusinessParking': {'garage': False, 'street': False, 'validated': False, 'lot': False, 'valet': False}}",
    "business_id": "YNI26xBkdOzI1TMGmIcEaw",
    "categories": ["Mexican", "Restaurants", "Fast Food"],
    "city": "Cleveland",
    "hours": "{'Monday': '7:00-2:00', 'Tuesday': '7:00-2:00', 'Friday': '7:00-3:00', 'Wednesday': '7:00-2:00', 'Thursday': '7:00-2:00', 'Sunday': '7:00-2:00', 'Saturday': '7:00-3:00'}",
    "is_open": 1,
    "location" : [-81.6915189 , 41.49931041],
    "name": "Taco Bell Cantina",
    "neighborhood": "Gateway District",
    "postal_code": 44114,
    "review_count": 17,
    "stars": 4
  }

http://localhost:3000/favourite?business_id=CtYWpX_cy1YdZgoKtS0Tqg [delete]

http://localhost:3000/favourite?user_id=5b353cfeee34971bc0c030df [get]
علشان يرجع كل المطاعم الي هو حاططها ف 
favourite  
وكمان المطاعم بترجع بالصور بتاعتها 
*/