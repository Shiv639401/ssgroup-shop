package com.ssgroup.shop.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssgroup.shop.entity.Order;
import com.ssgroup.shop.entity.OrderStatus;
import com.ssgroup.shop.repository.OrderRepository;
import com.ssgroup.shop.service.PaymentService;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    private final PaymentService paymentService;
    private final OrderRepository orderRepository;

    public PaymentController(PaymentService paymentService,
                             OrderRepository orderRepository) {
        this.paymentService = paymentService;
        this.orderRepository = orderRepository;
    }

    @PostMapping("/create/{orderId}")
    public Object createPayment(@PathVariable Long orderId) throws Exception {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        // ✅ if you want allow payment only in CREATED status
        if (order.getStatus() != OrderStatus.CREATED) {
            throw new RuntimeException("Invalid order status for payment");
        }

        var razorpayOrder = paymentService.createRazorpayOrder(order.getTotal().longValue());

        order.setPaymentOrderId(razorpayOrder.get("id").toString());
        order.setStatus(OrderStatus.PAYMENT_PENDING); // ✅ now works

        orderRepository.save(order);

        return razorpayOrder.toString(); // JSON string
    }
}
