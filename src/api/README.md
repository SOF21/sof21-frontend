# Calls being made to the backend
## From Actions

### Shop stuff
Get /order 
> Gets all orders made by user

Get /order/`id` 
> Specific order

Get /shopping_product 
> Specific product

Put	/cart 
> Place cart into backend for future purchase
>
> Payload:
>```json
>{	
>    "cart" : {
>        "items": {
>	         "amount": "number",
>	         "product_id": "number"
>       }
>    }
>}
>```

Post /store/charge 
> Make purchase with the cart currently placed into the backend
>
> Payload:
>```json
>{ 
>    "stripe_token": "number" 
>}
>```

### Orchestra
Get /orchestra
> All orchestras

Get /orchestra_signup
> The orchestras the user has signed up to

Get /orchestra/all_signups/?id=`id` 
> Gets all signups for a specific orchestra

Get /orchestra_signup/verify/
> Signup to a specific orchestra, code is received from orchestra leader
>
> Payload:
>```json
>{
>    "params": {
>        "code": "number"
>    }
>}
>```
  
  
## From API File

### Orchestra

Get /orchestra/`id` 
> Gets a specific orchestra

Get /orchestra/`id`/all_signups
>Gets all signups for a specific orchestra


Get /orchestra/anniversary
>All people that have been to SOF for a conscecutive amount of times
> Returns a .csv file

Get /orchestra/item_summary
> All items ordered by all orchestras
> Returns a .csv file

Get /orchestra/allergies
> Food allergies for all orchestras
> Returns a .csv file

Get /orchestra/overlaps
> People that are participating in several orchestras
> Returns a .csv file

Put /orchestra_signup/update_t_shirt_size/` íd `
> T-shirt sizes and amount collected after signup
>
> Payload:
> ```json
> {
>   "item": {
>         "orchestra_articles_attributes": [
> 	        { "kind" : "number", "size": "number", "id": "number" }
> 	    ]
>     }
> }
> ```
  

### Collect

Get /collect/`uuid`
> Show all items a user can collect

Post /collect/
>Used for admin to mark items as collected
>
>Payload:
>```json
>{
>    "id": "number",
>    "collected_ids": "number"
>}
>```
  
### Users

Get /users/get_user
>Payload:
>```json 
>{ 
>    "email": "string" 
>}
>```

Get /users/`id`

Get /users/get_user_uuid

Put /users/`id` 
>Update user, as admin, orchestra leader or yourself
>
>Payload:
>```json
>{
>    "usergroup": "number",
>    "display_name": "string",
>    "rebate_balance": "number",
>    "admin_permissions": "number"
>}
>```

Put /auth/password 
>Reset password
>
>Payload:
>```json
>{
>    "password": "string",
>    "password_confirmation": "string"
>}
>```
Post /auth/password
>Send email to reset password
>
>Payload:
>```json
>{
>    "email": "string",
>    "redirect_url": "string"
>}
>```
Post /users/set_liu_card_number
>Payload:
>```json
>{ 
>   "liu_card_number" : "number" 
>}
>```
