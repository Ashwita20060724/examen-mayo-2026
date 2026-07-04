# DeliverUS Frontend Exam - Model F - Restaurant Commission Management

Remember that DeliverUS is described at: <https://github.com/IISSI2-IS>

## Exam Statement - Frontend Owner

A **Commission Management System for Orders** has been implemented in the backend. Your task is to implement the necessary frontend interface so that restaurant owners can view and assign commissions to their restaurants.

### The Business Requirement

The backend already provides:

1. **Commission Types**: There are different types of commission:
   - **Free Commission (0%)**: No cost
   - **Standard Commission (10%)**: Commission on orders
   
2. **Accumulated Commission**: For each restaurant, you can check the total sum of all commissions applied to its orders.

3. **Restrictions**:
   - An owner can only have **one restaurant** with free commission.
   - If a restaurant already has orders and does not belong to the free plan, it cannot be changed to that plan.

### Commission Data

For each restaurant, the backend returns in `GET /users/myrestaurants`:
- `commission` (object): Information about the assigned commission
  - `id` (number): Commission identifier
  - `name` (string): Commission name
  - `percentage` (number): Commission percentage to apply
- `commissionId` (number): Identifier of the assigned commission

### Exercises: Frontend Functional Requirements

#### **Exercise 1: RF1. Display Assigned Commission in Restaurant List**

**Screen**: `RestaurantsScreen.js`

**Requirements**:

- Display the restaurant's **assigned commission** (**2 points**):
  - Show the commission percentage in parentheses (e.g., `(10%)`).
  - If no data is available, show `(N/A)`.

- Aesthetic consistency (**0.5 point**).

---

#### **Exercise 2: RF2. Display Accumulated Commission in Restaurant List**

**Screen**: `RestaurantsScreen.js`

**Requirements**:

- Display the restaurant's **accumulated commission** (**3 points**):
  - Label: `Accumulated Commission:`
  - Show the accumulated value in currency format with 2 decimals (e.g., `125.50€`).
  

- Aesthetic consistency (**0.5 point**).



*Restaurant list with RF1 and RF2:*
![RestaurantsScreen](screenshots/RestaurantsScreen.png)
---

#### **Exercise 3: RF3. Assign Commission from Edit Form**

**Screen**: `EditRestaurantScreen.js`

**Requirements**:

- Add a **dropdown to select the commission** (**2.5 points**):
  - Label: "Commission:"
  - Display all available commissions with format: `Name (Percentage%)`
  - Example: "Free (0%)", "Standard (10%)"
  - Commission is a **required field** in the form.

- Aesthetic consistency (**1.5 points**).


*Edit form including the commission selector:*
![EditRestaurantScreen](screenshots/EditRestaurantScreen.png)

*Error when trying to set commission:*
![ErrorCommission](screenshots/EditRestaurantScreenError.png)


---

## Available API Endpoints

### GET /users/myrestaurants

Returns list of authenticated owner's restaurants **including assigned commission information**.

**Response**:

```json
[
  {
    "id": 1,
    "name": "My Restaurant",
    "description": "Restaurant description",
    "commission": {
      "id": 2,
      "name": "Standard",
      "percentage": 10
    },
    "commissionId": 2,
    // ... more fields
  }
]
```

### GET /commissions

Returns list of all available commissions.

**Response**:

```json
[
  {
    "id": 1,
    "name": "Free",
    "percentage": 0
  },
  {
    "id": 2,
    "name": "Standard",
    "percentage": 10
  }
]
```

**Access**: Only authenticated users with `owner` role.

### GET /restaurants/:restaurantId/commission

Returns accumulated commission of a specific restaurant.

**Response**:

```json
{
  "totalCommission": 125.50
}
```

### PUT /restaurants/:restaurantId

Updates a restaurant. Already includes support for `commissionId` in the payload.

**Request**:

```json
{
  "name": "New Name",
  "commissionId": 2,
  // ... other fields
}
```

**Response (success - 200)**:

```json
{
  "id": 1,
  "name": "New Name",
  "commissionId": 2,
  // ... more fields
}
```

**Response (error - 409 Conflict)**:

```json
{
  "code": 409,
  "message": "You cannot change to free commission. This restaurant has orders."
}
```

---

## Environment Setup

### a) Windows

```bash
npm run install:all:win
```

### b) Linux/MacOS

```bash
npm run install:all:bash
```

## Execution

### Backend (in one terminal)

```bash
npm run start:backend
```

### Frontend (in another terminal)

```bash
cd DeliverUS-Frontend-Owner
npm start
```


## Delivery Procedure

1. Delete the **node_modules** folder from frontend and backend.
2. Create a ZIP file that includes the entire project. **Important: Make sure the ZIP is not the same one you downloaded and includes your solution**
3. Notify the professor before submitting.
4. Once the professor gives you approval, you can upload the ZIP to the Virtual Learning platform. **It is very important to wait for the platform to show you a link to the ZIP before pressing the submit button**. It is recommended to download that ZIP to verify what has been uploaded. Once you have verified it, you can submit the exam.
