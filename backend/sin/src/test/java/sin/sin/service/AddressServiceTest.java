package sin.sin.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;

import java.util.ArrayList;
import java.util.List;
import javax.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import sin.sin.domain.address.Address;
import sin.sin.domain.address.AddressRepository;
import sin.sin.domain.member.Gender;
import sin.sin.domain.member.Member;
import sin.sin.domain.member.MemberRepository;
import sin.sin.dto.address.AddressRequest;
import sin.sin.dto.address.AddressResponse;

@ExtendWith(MockitoExtension.class)
@Transactional
public class AddressServiceTest {

    @Mock
    private AddressRepository addressRepository;

    @Mock
    private MemberRepository memberRepository;

    @InjectMocks
    private AddressService addressService;

    Member member;
    Address address1;
    Address address2;

    @BeforeEach
    void setup() {
        member = Member.builder()
            ._id("test")
            .password("password")
            .name("하하ㅏㅎㅎ")
            .email("email")
            .phoneNumber("010-1111-1111")
            .gender(Gender.Male)
            .birth("1999-99-99")
            .build();
        address1 = Address.builder()
            .address("주소")
            .member(member)
            .recipient("하하하핳")
            .recipientPhoneNumber("010-1111-1111")
            .original(true)
            .selected(true)
            .build();
        address2 = Address.builder()
            .address("주소")
            .member(member)
            .original(false)
            .selected(false)
            .build();
    }

    @Test
    void findAddresses() {
        //given
        List<Address> addresses = new ArrayList<>();
        addresses.add(address1);
        addresses.add(address2);

        given(addressRepository.findAllByMemberId(member.getId())).willReturn(addresses);

        //when
        List<AddressResponse> responses = addressService.findAddresses(member);

        //then
        assertThat(responses.size()).isEqualTo(2);
        System.out.println(responses);
    }

    @Test
    void addAddress() {
        //given
        AddressRequest addressRequest = new AddressRequest("새 주소", false);

        //then   service 실행 이전
        assertThat(member.getAddresses().size()).isEqualTo(0);

        //when
        addressService.addAddress(member, addressRequest);

        //then service 실행 이후
        assertThat(member.getAddresses().size()).isEqualTo(1);
    }
}