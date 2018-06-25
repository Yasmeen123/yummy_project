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
 
 
 http://localhost:3000/reviews?business_id=tJRDll5yqpZwehenzE2cSg >>>>>>>>>>>. reviews

 http://localhost:3000/photos?business_id=TW6A7M0j0R9hp1zYpxz2FQ >>>>>>>>>>>> return photo for specific restaurant
 
 http://localhost:3000/menus?business_id=TW6A7M0j0R9hp1zYpxz2FQ >>>>>>>>>>>>>>. return menu of restaurant
 http://localhost:3000/menus?price=1 >>>>>>>>>>>>>>>>. $
 http://localhost:3000/menus?price=2 >>>>>>>>>>>>>>>>. $$
 http://localhost:3000/menus?price=3 >>>>>>>>>>>>>>>>. $$$
 http://localhost:3000/menus?rating=5 >>>>>>>>>>>>>. take any number from 1 to 5 
 all this return menu with restaurant with photos

 http://localhost:3000/orders >>>>>>>>>>>>>>>>>. it is post to store order 
   content    user_id , bussiness_id , order=[{dish_name , price}]

*/