import com.github.tomakehurst.wiremock.client.WireMock;
import jakarta.annotation.PostConstruct;
import org.junit.Before;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.reactive.AutoConfigureWebTestClient;
import org.springframework.cloud.contract.wiremock.AutoConfigureWireMock;
import io.cucumber.spring.CucumberContextConfiguration;

import static com.github.tomakehurst.wiremock.client.WireMock.*;

@AutoConfigureWebTestClient
@AutoConfigureMockMvc
@AutoConfigureWireMock(port = 56789)
@ActiveProfiles("test")
@CucumberContextConfiguration
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class StepContextConfiguration {

    @MockBean
    private WsJWTGenerator jwtGenerator;

    @Before
    public void setUp() {
        setupWireMockStubs();
    }

    private void setupWireMockStubs() {
        // REST Stub - Account Number
        stubFor(post(urlEqualTo("/cardissuer/acctnbr/v1/acctnbr/query"))
            .withHeader("HTTP_AUTH_TOKEN", matching(".*"))
            .withRequestBody(matchingJsonPath("$.accountKey"))
            .willReturn(okJson("{ \"acctNbr\": \"1234567890123456\" }")));

        // REST Stub - Master Account Number
        stubFor(post(urlEqualTo("/cardissuer/acctnbr/v1/masteracctkey/query"))
            .withHeader("HTTP_AUTH_TOKEN", matching(".*"))
            .withRequestBody(matchingJsonPath("$.acctNbr"))
            .willReturn(okJson("{ \"masterAcctNbr\": \"6543210987654321\" }")));

        // SOAP Stub - getDisputeStatus
        stubFor(post(urlPathEqualTo("/CMDisputesSecureServiceWeb/CMDisputesServiceA0BeanService"))
            .withHeader("HTTP_AUTH_TOKEN", matching(".*"))
            .withRequestBody(containing("<getDisputeStatus"))
            .willReturn(aResponse()
                .withStatus(200)
                .withHeader("Content-Type", "text/xml")
                .withBody(getSoapDisputeStatusResponse())));
    }

    private String getSoapDisputeStatusResponse() {
        return """
            <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                              xmlns:ns="http://ao.cdisputesservice.cdisputes.discoverfinancial.com/">
              <soapenv:Body>
                <ns:getDisputeStatusResponse>
                  <return>
                    <caseNumber>112221111D</caseNumber>
                    <caseType>CE</caseType>
                    <disputable>false</disputable>
                    <notDisputableMessage>Case Exists</notDisputableMessage>
                    <notDisputableReasonCode>AD</notDisputableReasonCode>
                    <nonDisputeReasonTextForCm>This transaction has previously been disputed.</nonDisputeReasonTextForCm>
                    <nonDisputeReasonBodyForCm>Eligibility Denied</nonDisputeReasonBodyForCm>
                  </return>
                </ns:getDisputeStatusResponse>
              </soapenv:Body>
            </soapenv:Envelope>
        """;
    }
}




# Moviestore

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.1.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
