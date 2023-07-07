const Order = require("../models/order.model");

const addOrder = async (req, res) => {
    const { customer, item, quantity, orderFor, deliveryAddress,amount, orderStatus, paymentStatus, bankName, accName } =
      req.body;
  
    const order = new Order({
        customer,
        item,
     
        quantity,
       
        orderFor,
        deliveryAddress,
        amount,
        orderStatus,
        paymentStatus,
        bankName,
        accName
    });
  
    await order
      .save()
      .then(() => res.json(order._id))
      .catch((error) => res.status(400).json("Error: " + error));
  };

  const getOrders = async (req, res) => {
    try {
      const order = await Order.find();
      res.json(order);
    } catch (error) {
      res.status(500).send("Server Error" + error);
    }
  };

  const getOrderById = async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      res.json(order);
    } catch (error) {
      res.status(500).send("Server Error" + error);
    }
  };

  const updateOrder = async (req, res) => {
    Order.findByIdAndUpdate(req.params.id)
      .then((existingOrder) => {
        existingOrder.customer = req.body.customer;
        existingOrder.item = req.body.item;
      
        existingOrder.quantity = req.body.quantity;
        
        existingOrder.orderFor = req.body.orderFor;
        existingOrder.deliveryAddress = req.body.deliveryAddress;
        existingOrder.amount = req.body.amount;
        existingOrder.orderStatus = req.body.orderStatus;
        existingOrder.paymentStatus = req.body.paymentStatus;
        existingOrder.bankName = req.body.bankName;
        existingOrder.accName = req.body.accName;
        
        existingOrder
          .save()
          .then(() => res.json('Order updated!'))
          .catch((error) => res.status(400).json("Error: " + error));
      })
      .catch((error) => res.status(400).json("Error: " + error));
  };

  const updateOrderStatus = async (req, res) => {
    Order.findByIdAndUpdate(req.params.id)
      .then((existingOrder) => {
       
        existingOrder.orderStatus = req.body.orderStatus;
        
        existingOrder
          .save()
          .then(() => res.json('Order Status updated!'))
          .catch((error) => res.status(400).json("Error: " + error));
      })
      .catch((error) => res.status(400).json("Error: " + error));
  };
  
  const deleteOrder = async (req, res) => {
    Order.findByIdAndDelete(req.params.id)
      .then((deletedOrder) => {
        res.json('Order deleted');
      })
      .catch((error) => res.status(400).json("Error: " + error));
  };
  
  module.exports = {
    addOrder,
    getOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
    updateOrderStatus
   
  }