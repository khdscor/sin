package sin.sin.controller;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import sin.sin.dto.FreqQuestionResponse;
import sin.sin.service.FreqQuestionService;

@RestController
@RequestMapping("/shop/service")
@RequiredArgsConstructor
public class FreqQuestionController {

    private final FreqQuestionService freqQuestionService;

    @GetMapping("/faq")
    public ResponseEntity<List<FreqQuestionResponse>> findAllFaq(@RequestParam(value="page", defaultValue = "1") int page){

        List<FreqQuestionResponse> freqQuestionResponse = freqQuestionService.findAllFaq(page);

        return ResponseEntity.ok().body(freqQuestionResponse);
    }
}