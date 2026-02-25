package com.ssgroup.shop.service;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;

@Service
public class PaymentService {

    @Value("${razorpay.key}")
    private String KEY;

    @Value("${razorpay.secret}")
    private String SECRET;

    public Order createRazorpayOrder(Long amount) throws Exception {

        RazorpayClient client = new RazorpayClient(KEY, SECRET);

        JSONObject options = new JSONObject();
        options.put("amount", amount * 100); // paise
        options.put("currency", "INR");
        options.put("receipt", "order_rcptid_" + System.currentTimeMillis());
        options.put("payment_capture", 1);

        return client.orders.create(options); // ✅ returns com.razorpay.Order
    }
}
