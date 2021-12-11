package sin.sin.controller;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import sin.sin.config.auth.CurrentUser;
import sin.sin.config.auth.PrincipalDetails;
import sin.sin.dto.order.OrderProductsResponse;
import sin.sin.dto.order.OrdersResponse;
import sin.sin.service.OrdersService;

@RestController
@RequestMapping("/mypage")
@RequiredArgsConstructor
public class OrdersController {

    private final OrdersService ordersService;

    @GetMapping("/orderList")
    public ResponseEntity<List<OrdersResponse>> findOrdersIds(
        @CurrentUser PrincipalDetails userDetails) {
        List<OrdersResponse> ordersResponseList = ordersService.findOrdersIds(
            userDetails.getMember());

        return ResponseEntity.ok().body(ordersResponseList);
    }

    @GetMapping("/orderview")
    public ResponseEntity<List<OrderProductsResponse>> findProductsByOrderId(
        @RequestParam("ordno") Long orderId,
        @CurrentUser PrincipalDetails userDetails) {
        List<OrderProductsResponse> responses = ordersService.findProductsByOrderId(orderId,
            userDetails.getMember());

        return ResponseEntity.ok().body(responses);
    }
}