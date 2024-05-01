# NodeX Agent API

NodeX Agent is a resident Linux daemon process that provides NodeX Agent functionality as an HTTP-based API to another application, mainly within the Linux OS. Since this type of NodeX Agent provides HTTP-based API, it can be used regardless of the implementation language of the application that uses the API, and it can be used with zero learning cost by providing pre-built binaries.

The following API is provided through the Unix Domain Socket (~/.nodex/run/nodex.sock) for applications using the NodeX Agent. that can hit the Unix Domain Socket to communicate with NodeX Agent through the socket.

NodeX provides APIs for encryption and decryption for the messages themselves, which are used to send and receive messages between devices.
NodeX enables encryption/decryption status checks on communications made between devices.
This will help administrators monitor devices and the applications embedded in them.
(Sending and receiving of application data is left to the applications you are using.)

The APIs provided by NodeX Agent are categorized as High-Level API and Low-Level API.

NodeX's **High-Level API** provides a set of APIs that support accountability and reliability in sending and receiving encrypted application data.

Specifically, it allows the receiving device to verify that the device sending the application data is sending it to the intended device.
In addition, it logs when application data is encrypted and decrypted during transmission and reception. The administrator can track the status of data encryption and decryption between devices.

NodeX's **Low-Level API** provides more detailed control and greater flexibility than the High Level API.

See the Low Level API if you want to select the type of DIDComm messages on the application side, control the signing and verification of verifiable credentials, or require a customized process for encryption and decryption.


## High-Level API

### DID Operations

#### Create DIDComm Message

```{eval-rst}
.. http:post:: /create-didcomm-message

  Create DIDComm message using the DIDComm protocol.

  :<header Content\\-Type: Specifies :code:`application/json` as a fixed value.
  :<json String required destination_did: Specifies the destination DID.
  :<json String required message: Specifies data to be sent through the DIDComm protocol.
  :<json String required operation_tag: 

  **Response JSON Objects:** Response JSON Objects follow the DIDComm Messageing data model. See `here <https://identity.foundation/didcomm-messaging/spec/#message-formats>`_ for details.

  :status 200: Success.
  :status 400: Bad Request.
  :status 401: Unauthorized.
  :status 403: Forbidden.
  :status 404: Not found.
  :status 409: Conflict.
  :status 500: Internal server error.

  **Example**:

  .. code-block:: python
    :linenos:
    :caption: Python

    from sock import post

    def main():
        # The endpoint and payload you want to send
        endpoint = "/create-didicomm-message"
        payload = {
            "destination_did": "did:nodex:test:EiBprXreMiba4loyl3psXm0RsECdtlCiQIjM8G9BtdQplA",
            "message": """{"string": "value","number": 1,"boolean": True,"array": [],"map": {}}""",
            "operation_tag": "test-operation-tag",
        }

        # Send the POST request and print the response
        json_response = post(endpoint, payload)
        print(json_response)

    if __name__ == "__main__":
        main()

  .. code-block:: json
    :linenos:
    :caption: Response (JSON)

    {
        "ciphertext": "Kl3qKzuRblaTH9371vabsTo0hFVCMrG2OIevNvDg_WwIME7MEUqwNIlaMuj-U4ym9ri4WT74AsfkigkUBiBFYPhz9LwjW6tpmBNfrDNvhCClGMqApT8ostS-s2ML4uDbWdEtQSBX2yOlDb1LnI8uDsk02QNvE9AHaJJk6M22859VvxvCzaguZzltjOmQJOcntC2b4Rerup9-Qx8dijGE4dP6pkTAJ4NRJ2cl4r9n4NQeZcJCx43T95lTlEyGoNsEajHAOJJyexHtASycgewNC817ypodIb3Do-iiuJ0LuQ-v8tqe6tg8jmuZpQ-vL0_TjVlY4tI6djo3TmXk3iWua_pz6aj2VDu5T_Bt-YhgbZKfKwSw2p9zOugjPhfNdDNG0FpmYRCtnrvK0E2KAbcjDpNz2SUZqvS-RII44NVNc22tBC4SqSJEIYVKzT2oUuPAWCkukCi_NFmAfot6gcAO9zxddfLV-hUuu6nbjyDTs06IRQQnZGy-qydr-7jYcSDvPOdfMmoXkRME6iXhtaLRuKP0w_liZuLm0yWJn4dKvq5kHuqybBcklt_CZmNUI0VUe-ipUdfH8yrW_7WYROQCLbg2AI7bxA9zpLXn2HrJJQTDOZRKZanadSqRVnEPKbRazGMPywQenx817AzbqKYN9h-FnqPoi5ToLJO8x6egqT5UBz6H-YvYqvtXTCpkw4_d34cIwG8NY8CNqBASteE6V0qgj7iu2qIUemtuOtEesaFRVirlcyZ1k3T__mxtNwhm9wUxtYpGY9FXA1j_6hUpmwmmWhQ7UGJOubvRDdqgnP8Q7cgM7atUboJmJOhiBvgJhp4IKh9U_kje2ryNwXTWDsRT4z1GcAR3xTo-fuSEozIlElb0dLWPjb3yxDChA0NdNEmPB36LXKFmMn3muE_ETv14vcK34-46T9qPvvIALth8uUIgcxcon6tFrJ2iycJZ1CfTbZa3FTTW10fk0IKuevW0PMWcr13v6oZiQV0xbW9sRpqbESncyk9m845HdEsz5Jl4mHdg3WTi0MdDPSb4l2Uj3Qb74zy8J8lL7YLcBp_HTnbHIVXVcEg1tE3rMF4RCCaDg2WVUzfcthK0WyIW_bB3JeLNa0CNN5VTeyyqjcI4xk9I_kQBuIbnpbglefMYtHKB7DD28Dl78xY8J9toKVdcR5EzOg5UYMDO3GgztCbpGzGujwkLu2H7UI5mLeouu8dVhYvve43VPCtNNRki22Ku953ZYAHqOX-JZJDnx02pVa4_k5ZNTszR34vUf0KVlmyHBFYRhDtuUsLFr1a5yd2mQdRNQvuOIYdknTTRkyvQTk_CpfiF6nw_NNZCH554J3kMCuq7oDyvs0nbah82eKAnGsLCojAQWsNUmzzKBg463ru--w_tI5U419wNqHpNzU36QKfDlfhOIhm96DVhhx3w4Kh9nrAfxMeHm6JHflO4KgWQOjc-iRem9sKKTuAQP_dXybosCOT4WgnBiiw1pd1q5QlORlt-hKzkkn_4uw6QKm6VPfv2NtLfnms9esb7-TND7Fu_5wXkgr8SFTtCld5Gty1d15orkEo3VfhgKVi62HrjqNF0X8DKva-XnJLpjvet7_aUkKfGpGwHyy9Y32onp2P_lKNCOe2ZQfjd8rA2B1mhSKbVStSt_YBMogJGxuaR81QL6Amm065xJp56KDbkMZXn97WEqZn8XwwXJ2Zr6ynQn11IOBdOlih3T768m0rPcXaClO0yOqioPK2BgJEjTQ_THmvQ3Ol5xgXWWjjFGGvd60gM2B-9zI9SAc0M3jfXS3Mj56IVVzE-7BhjtSYuiv8JsCY5eXj1DiKFvr9naW0CCS-J-776wXflee9qQTFu3sIu9c3iPe2t6acbLDgJlbU3chHqktbM1Knpha7ECUsWfEOn0YJuu1hF8AQsz9_OD2Vw271Q8O2lv7JfBCc5DsS5QkIrYRB7VTOtVhT6wm1cDIbwgJFKSdRgjpfVndjc8EW0UxW55h4sjTmVrO47hWbo1WLYVkAr-NaQlKyf6qN3M64OVTnLVOr-WgQOzw_lp7j3ViQeFqpLWL-5ZMZyZOnEtxEpU4SIYPCFmxdmaPY_6RL7RZsSMBc3tNg-2De5LdXz9l1CiS-mZwXCcfZqwSNStUHEWhyTGnKM4DhvLjJgC7YGSlMthiqs4k8hXyPo54u52CL9IMS-0VjHm556nM_y93wXqI076yHxOexvcQXywCe4gzaAqahqEIeM2bZikFb_f8uZyEOCazNRQQAQky4oHLYmQbCVeviVvAZLc1SnuGiJY0kZUuw3ooxpB006GN00ZMjj1dsgsy7GG3IeEGZuDNqEaffI96JGFzuTxAcxhPblR_kPMYDMPOy35eu3TNKHuIAIrmFnWVMhR2IZMYI4ara285lUicwFgmHw5xEACmkSTbccTma2VF4L7w7AF4DJd2DZS4HbctR0oGLD3RDAm9mUpH2CPZOM-_Pbx-bo0pYK5AGuGl-pBamB_dAQGaRL4DuAK0hg5ox1fw-JEEb4lvzlGa7dLMd8tluBQNi3t9DQAXKtovhCwP-mGSU0Jtml9NtzojPYiym1EaB9xGYuEAYPQHDOceLGzRlV4PrXSkBcz6xGAUMH3Urp5TxpAUreZEbZ7SqKsS8Wjb-zEMWBu7_b9YlcnMQAlKSNXv3cJRQViqs0o-G_QHxN5281MeoX86mwBBJPmDgyW06tn8vBuwn7IRY5k2fntUET6my3nZxEBz0L8i0iO4nMUAIJXHqL4n0nL120L58viM61QQ8QOEUODLi0gypc5ykOw2xSztFTGDoy2ho30Yfr4bkk28blEwIcuowAMA841IJlNRnWzcibEItu3FsEpos18gbKpYYUF0ZbZFT7rzunTbZxKbcIbVQdihHKUYJHr8uHMC7Db27o5UQaziEBinlwagYAhKWUNjFyinohElNSN-Knpe9vSOw5xCs8w1ZH0yXuxE6nwuuy5WH3CNIGB31Pqw4ZpgF86j-A7W6XcbGysLqPXqibor9WFVddHBle5AWqEbfO4-7w9UbQAqpPGf9LKv63ZFkyrz0neZkN9LliWQcIqxq5a1xPSlzsXZdvwWTQLFBe0Tuh2Pa0Vcneb3lFmM8iFWneXoKE_8jyNj1m1tjOVPJVeA6Zyp5Q24yT0IFK064v0JeeICiq3l_TcGBeYIwThkxVqKZ9j7lJPGkOwpMDd9im1o2ZC2iiVmQ1Al3gV1qo_ZCN5G5Xwt8kD-G5hpiioXLxnqcHTCYRt8EWopJMu9e3xKN8PJ0Sz3WC7hBPCrG5zAF51bwBPj4pDtJYpHUh2d54jTxhr60ScCVEuWcZTzzT9g3IHXWul8zNCqU-2gXFwtV-5GM0q93rahi-VpQSGDgYJLZhAAsD9TqQC_zexmNK3RB842kuaCjj8dlny3masSupfUhlhMnPN9xX7jJWKVNSv2pg3wMyeDSIOwQEyeC0A6OoeQE",
        "iv": "5CacbRzccXcTOwBGqXNI8wG3-be4-xOy",
        "protected": "eyJ0eXAiOiJhcHBsaWNhdGlvbi9kaWRjb21tLWVuY3J5cHRlZCtqc29uIiwiZW5jIjoiWEMyMFAiLCJraWQiOiJub21NTHFNbnRrelB3eVluMXRKN3NuRHVmOWZ0NHlFNGRXdGZxbHdjbHp3Iiwic2tpZCI6ImRpZDpub2RleDp0ZXN0OkVpRDFUNjU3TWhfV1RMMlA2dE4yV3VZd3FpVWUtUUpnWU9oNkxGR1g1UG1YTlEiLCJhbGciOiJFQ0RILTFQVStYQzIwUEtXIn0",
        "recipients": [
            {
                "encrypted_key": "0I1uB5c8rSZTRwA5Ud5u8UnKLXkbxNxv6HX-yFFh4v4",
                "header": {
                    "alg": "ECDH-1PU+XC20PKW",
                    "epk": {
                        "crv": "X25519",
                        "kty": "OKP",
                        "x": "v72FYsMD6Xpoki6dthH9h7dqS9JWlebwEsnB_-Ra6Qg"
                    },
                    "iv": "mGBcQnSxeHhb94_mUZZwJ31GM8Jas0L7",
                    "key_ops": [],
                    "kid": "did:nodex:test:EiD1T657Mh_WTL2P6tN2WuYwqiUe-QJgYOh6LFGX5PmXNQ",
                    "tag": "pKdEAiL4OJZoLoqLbVPI_g"
                }
            }
        ],
        "tag": "EtH6ll0apH133Y74wbqU4A"
    }
```

#### Verify DIDComm Message

```{eval-rst}
.. http:post:: /verify-didcomm-message

  Transmits data using the DIDComm protocol.

  :<header Content\\-Type: Specifies :code:`application/json` as a fixed value.
  :<json String required message: An application message sent by the sending application, assuming the data structure defined in DIDComm Message.

  **Response JSON Objects:** Response JSON Objects follow the VerifiableCredentials data model. See `here <https://www.w3.org/TR/vc-data-model/#basic-concepts>`_ for details.

  :status 200: Success.
  :status 400: Bad Request.
  :status 401: Unauthorized.
  :status 403: Forbidden.
  :status 404: Not found.
  :status 409: Conflict.
  :status 500: Internal server error.

  **Example**:

  .. code-block:: python
    :linenos:
    :caption: Python

    from sock import post


    def main():
        # The endpoint and payload you want to send
        endpoint = "/verify-didcomm-message"
        payload = {
            "message": """
                {
                    "ciphertext": "Kl3qKzuRblaTH9371vabsTo0hFVCMrG2OIevNvDg_WwIME7MEUqwNIlaMuj-U4ym9ri4WT74AsfkigkUBiBFYPhz9LwjW6tpmBNfrDNvhCClGMqApT8ostS-s2ML4uDbWdEtQSBX2yOlDb1LnI8uDsk02QNvE9AHaJJk6M22859VvxvCzaguZzltjOmQJOcntC2b4Rerup9-Qx8dijGE4dP6pkTAJ4NRJ2cl4r9n4NQeZcJCx43T95lTlEyGoNsEajHAOJJyexHtASycgewNC817ypodIb3Do-iiuJ0LuQ-v8tqe6tg8jmuZpQ-vL0_TjVlY4tI6djo3TmXk3iWua_pz6aj2VDu5T_Bt-YhgbZKfKwSw2p9zOugjPhfNdDNG0FpmYRCtnrvK0E2KAbcjDpNz2SUZqvS-RII44NVNc22tBC4SqSJEIYVKzT2oUuPAWCkukCi_NFmAfot6gcAO9zxddfLV-hUuu6nbjyDTs06IRQQnZGy-qydr-7jYcSDvPOdfMmoXkRME6iXhtaLRuKP0w_liZuLm0yWJn4dKvq5kHuqybBcklt_CZmNUI0VUe-ipUdfH8yrW_7WYROQCLbg2AI7bxA9zpLXn2HrJJQTDOZRKZanadSqRVnEPKbRazGMPywQenx817AzbqKYN9h-FnqPoi5ToLJO8x6egqT5UBz6H-YvYqvtXTCpkw4_d34cIwG8NY8CNqBASteE6V0qgj7iu2qIUemtuOtEesaFRVirlcyZ1k3T__mxtNwhm9wUxtYpGY9FXA1j_6hUpmwmmWhQ7UGJOubvRDdqgnP8Q7cgM7atUboJmJOhiBvgJhp4IKh9U_kje2ryNwXTWDsRT4z1GcAR3xTo-fuSEozIlElb0dLWPjb3yxDChA0NdNEmPB36LXKFmMn3muE_ETv14vcK34-46T9qPvvIALth8uUIgcxcon6tFrJ2iycJZ1CfTbZa3FTTW10fk0IKuevW0PMWcr13v6oZiQV0xbW9sRpqbESncyk9m845HdEsz5Jl4mHdg3WTi0MdDPSb4l2Uj3Qb74zy8J8lL7YLcBp_HTnbHIVXVcEg1tE3rMF4RCCaDg2WVUzfcthK0WyIW_bB3JeLNa0CNN5VTeyyqjcI4xk9I_kQBuIbnpbglefMYtHKB7DD28Dl78xY8J9toKVdcR5EzOg5UYMDO3GgztCbpGzGujwkLu2H7UI5mLeouu8dVhYvve43VPCtNNRki22Ku953ZYAHqOX-JZJDnx02pVa4_k5ZNTszR34vUf0KVlmyHBFYRhDtuUsLFr1a5yd2mQdRNQvuOIYdknTTRkyvQTk_CpfiF6nw_NNZCH554J3kMCuq7oDyvs0nbah82eKAnGsLCojAQWsNUmzzKBg463ru--w_tI5U419wNqHpNzU36QKfDlfhOIhm96DVhhx3w4Kh9nrAfxMeHm6JHflO4KgWQOjc-iRem9sKKTuAQP_dXybosCOT4WgnBiiw1pd1q5QlORlt-hKzkkn_4uw6QKm6VPfv2NtLfnms9esb7-TND7Fu_5wXkgr8SFTtCld5Gty1d15orkEo3VfhgKVi62HrjqNF0X8DKva-XnJLpjvet7_aUkKfGpGwHyy9Y32onp2P_lKNCOe2ZQfjd8rA2B1mhSKbVStSt_YBMogJGxuaR81QL6Amm065xJp56KDbkMZXn97WEqZn8XwwXJ2Zr6ynQn11IOBdOlih3T768m0rPcXaClO0yOqioPK2BgJEjTQ_THmvQ3Ol5xgXWWjjFGGvd60gM2B-9zI9SAc0M3jfXS3Mj56IVVzE-7BhjtSYuiv8JsCY5eXj1DiKFvr9naW0CCS-J-776wXflee9qQTFu3sIu9c3iPe2t6acbLDgJlbU3chHqktbM1Knpha7ECUsWfEOn0YJuu1hF8AQsz9_OD2Vw271Q8O2lv7JfBCc5DsS5QkIrYRB7VTOtVhT6wm1cDIbwgJFKSdRgjpfVndjc8EW0UxW55h4sjTmVrO47hWbo1WLYVkAr-NaQlKyf6qN3M64OVTnLVOr-WgQOzw_lp7j3ViQeFqpLWL-5ZMZyZOnEtxEpU4SIYPCFmxdmaPY_6RL7RZsSMBc3tNg-2De5LdXz9l1CiS-mZwXCcfZqwSNStUHEWhyTGnKM4DhvLjJgC7YGSlMthiqs4k8hXyPo54u52CL9IMS-0VjHm556nM_y93wXqI076yHxOexvcQXywCe4gzaAqahqEIeM2bZikFb_f8uZyEOCazNRQQAQky4oHLYmQbCVeviVvAZLc1SnuGiJY0kZUuw3ooxpB006GN00ZMjj1dsgsy7GG3IeEGZuDNqEaffI96JGFzuTxAcxhPblR_kPMYDMPOy35eu3TNKHuIAIrmFnWVMhR2IZMYI4ara285lUicwFgmHw5xEACmkSTbccTma2VF4L7w7AF4DJd2DZS4HbctR0oGLD3RDAm9mUpH2CPZOM-_Pbx-bo0pYK5AGuGl-pBamB_dAQGaRL4DuAK0hg5ox1fw-JEEb4lvzlGa7dLMd8tluBQNi3t9DQAXKtovhCwP-mGSU0Jtml9NtzojPYiym1EaB9xGYuEAYPQHDOceLGzRlV4PrXSkBcz6xGAUMH3Urp5TxpAUreZEbZ7SqKsS8Wjb-zEMWBu7_b9YlcnMQAlKSNXv3cJRQViqs0o-G_QHxN5281MeoX86mwBBJPmDgyW06tn8vBuwn7IRY5k2fntUET6my3nZxEBz0L8i0iO4nMUAIJXHqL4n0nL120L58viM61QQ8QOEUODLi0gypc5ykOw2xSztFTGDoy2ho30Yfr4bkk28blEwIcuowAMA841IJlNRnWzcibEItu3FsEpos18gbKpYYUF0ZbZFT7rzunTbZxKbcIbVQdihHKUYJHr8uHMC7Db27o5UQaziEBinlwagYAhKWUNjFyinohElNSN-Knpe9vSOw5xCs8w1ZH0yXuxE6nwuuy5WH3CNIGB31Pqw4ZpgF86j-A7W6XcbGysLqPXqibor9WFVddHBle5AWqEbfO4-7w9UbQAqpPGf9LKv63ZFkyrz0neZkN9LliWQcIqxq5a1xPSlzsXZdvwWTQLFBe0Tuh2Pa0Vcneb3lFmM8iFWneXoKE_8jyNj1m1tjOVPJVeA6Zyp5Q24yT0IFK064v0JeeICiq3l_TcGBeYIwThkxVqKZ9j7lJPGkOwpMDd9im1o2ZC2iiVmQ1Al3gV1qo_ZCN5G5Xwt8kD-G5hpiioXLxnqcHTCYRt8EWopJMu9e3xKN8PJ0Sz3WC7hBPCrG5zAF51bwBPj4pDtJYpHUh2d54jTxhr60ScCVEuWcZTzzT9g3IHXWul8zNCqU-2gXFwtV-5GM0q93rahi-VpQSGDgYJLZhAAsD9TqQC_zexmNK3RB842kuaCjj8dlny3masSupfUhlhMnPN9xX7jJWKVNSv2pg3wMyeDSIOwQEyeC0A6OoeQE",
                    "iv": "5CacbRzccXcTOwBGqXNI8wG3-be4-xOy",
                    "protected": "eyJ0eXAiOiJhcHBsaWNhdGlvbi9kaWRjb21tLWVuY3J5cHRlZCtqc29uIiwiZW5jIjoiWEMyMFAiLCJraWQiOiJub21NTHFNbnRrelB3eVluMXRKN3NuRHVmOWZ0NHlFNGRXdGZxbHdjbHp3Iiwic2tpZCI6ImRpZDpub2RleDp0ZXN0OkVpRDFUNjU3TWhfV1RMMlA2dE4yV3VZd3FpVWUtUUpnWU9oNkxGR1g1UG1YTlEiLCJhbGciOiJFQ0RILTFQVStYQzIwUEtXIn0",
                    "recipients": [
                        {
                            "encrypted_key": "0I1uB5c8rSZTRwA5Ud5u8UnKLXkbxNxv6HX-yFFh4v4",
                            "header": {
                                "alg": "ECDH-1PU+XC20PKW",
                                "epk": {
                                    "crv": "X25519",
                                    "kty": "OKP",
                                    "x": "v72FYsMD6Xpoki6dthH9h7dqS9JWlebwEsnB_-Ra6Qg"
                                },
                                "iv": "mGBcQnSxeHhb94_mUZZwJ31GM8Jas0L7",
                                "key_ops": [],
                                "kid": "did:nodex:test:EiD1T657Mh_WTL2P6tN2WuYwqiUe-QJgYOh6LFGX5PmXNQ",
                                "tag": "pKdEAiL4OJZoLoqLbVPI_g"
                            }
                        }
                    ],
                    "tag": "EtH6ll0apH133Y74wbqU4A"
                }
            """
        }

        # Send the POST request and print the response
        json_response = post(endpoint, payload)
        print(json_response)

    if __name__ == "__main__":
        main()

  .. code-block:: json
    :linenos:
    :caption: Response (JSON)

    {
        "issuer": {
            "id": "did:nodex:test:EiD1T657Mh_WTL2P6tN2WuYwqiUe-QJgYOh6LFGX5PmXNQ"
        },
        "issuanceDate": "2024-03-28T11:46:12.375150+00:00",
        "@context": [
            "https://www.w3.org/2018/credentials/v1"
        ],
        "type": [
            "VerifiableCredential"
        ],
        "credentialSubject": {
            "container": {
                "created_at": "2024-03-28T11:46:12.375150+00:00",
                "message_id": "bcf0b192-2179-4d72-8912-21c321e60e61",
                "payload": "{\"string\": \"value\",\"number\": 1,\"boolean\": true,\"array\": [],\"map\": {}}",
                "project_hmac": "7163c1c9be173e830e9bbe8d9020413770899b01a5153d331c56985a9a83c80b"
            }
        },
        "proof": {
            "type": "EcdsaSecp256k1Signature2019",
            "proofPurpose": "authentication",
            "created": "2024-03-28T11:46:12.448829+00:00",
            "verificationMethod": "did:nodex:test:EiD1T657Mh_WTL2P6tN2WuYwqiUe-QJgYOh6LFGX5PmXNQ#signingKey",
            "jws": "eyJhbGciOiJFUzI1NksiLCJiNjQiOmZhbHNlLCJjcml0IjpbImI2NCJdfQ..prBjKzEsaZC7wZgjUPNh-6dPy8-e69gqB0kzn_qbJm92aRn_FjFyOcZN3mC8stczaBMK5AtFA3HWLnItN2LzVA",
            "controller": null,
            "challenge": null,
            "domain": null
        }
    }
```

### Credential Operations

#### Create Verifiable Message

```{eval-rst}
.. http:post:: /create-verifiable-message

  Create DIDComm message using the DIDComm protocol.

  :<header Content\\-Type: Specifies :code:`application/json` as a fixed value.
  :<json String required destination_did: Specifies the destination DID.
  :<json String required message: Specifies data to be sent through the DIDComm protocol.
  :<json String required operation_tag: 

  **Response JSON Objects:** Response JSON Objects follow the VerifiableCredentials data model. See `here <https://www.w3.org/TR/vc-data-model/#basic-concepts>`_ for details.

  :status 200: Success.
  :status 400: Bad Request.
  :status 401: Unauthorized.
  :status 403: Forbidden.
  :status 404: Not found.
  :status 409: Conflict.
  :status 500: Internal server error.

  **Example**:

  .. code-block:: python
    :linenos:
    :caption: Python

    from sock import post
    import json
    import pprint

    destination_did = (
        "did:nodex:test:EiD1T657Mh_WTL2P6tN2WuYwqiUe-QJgYOh6LFGX5PmXNQ"
    )
    message = {
        "message": {
            "string": "value",
            "number": 1,
            "boolean": True,
            "array": ["foo", "bar", "baz"],
            "map": {"key": "value"},
        }
    }
    operation_tag = "test-operation-tag"


    def main():
        payload = {
            "destination_did": destination_did,
            "message": json.dumps(message),
            "operation_tag": operation_tag,
        }

        json_response = post("/create-verifiable-message", payload)

        print("The response is as follows.\n")
        print(json_response)

        print('\nPlease paste below to "verify_vc_message.py".\n')
        pprint.pprint(json.loads(json_response), sort_dicts=False)


    if __name__ == "__main__":
        main()

  .. code-block:: json
    :linenos:
    :caption: Response (JSON)

    {
        "issuer": {
            "id": "did:nodex:test:EiD1T657Mh_WTL2P6tN2WuYwqiUe-QJgYOh6LFGX5PmXNQ"
        },
        "issuanceDate": "2024-03-28T11:56:36.876469+00:00",
        "@context": [
            "https://www.w3.org/2018/credentials/v1"
        ],
        "type": [
            "VerifiableCredential"
        ],
        "credentialSubject": {
            "container": {
                "created_at": "2024-03-28T11:56:36.876469+00:00",
                "destination_did": "did:nodex:test:EiD1T657Mh_WTL2P6tN2WuYwqiUe-QJgYOh6LFGX5PmXNQ",
                "message_id": "d3bda5b9-9fc8-4169-8725-e87e9d8a5ed5",
                "payload": "{\"message\": {\"string\": \"value\", \"number\": 1, \"boolean\": true, \"array\": [\"foo\", \"bar\", \"baz\"], \"map\": {\"key\": \"value\"}}}",
                "project_hmac": "7163c1c9be173e830e9bbe8d9020413770899b01a5153d331c56985a9a83c80b"
            }
        },
        "proof": {
            "type": "EcdsaSecp256k1Signature2019",
            "proofPurpose": "authentication",
            "created": "2024-03-28T11:56:36.945673+00:00",
            "verificationMethod": "did:nodex:test:EiD1T657Mh_WTL2P6tN2WuYwqiUe-QJgYOh6LFGX5PmXNQ#signingKey",
            "jws": "eyJhbGciOiJFUzI1NksiLCJiNjQiOmZhbHNlLCJjcml0IjpbImI2NCJdfQ..hsOsSYVBgeozKiPd_ryUt2zDEdoJLJWb-h-MBz6_A54DE6Vdxior3QEzxKflyiSpjpywCl92CxM09JCiszeI8Q",
            "controller": null,
            "challenge": null,
            "domain": null
        }
    }
```

#### Verify Verifiable Message

```{eval-rst}
.. http:post:: /verify-verifiable-message

  Transmits data using the DIDComm protocol.

  :<header Content\\-Type: Specifies :code:`application/json` as a fixed value.
  :<json Array<String> required destinations: Specifies the destination DID. For now, the number of destinations that can be specified is limited to 1 - 4.
  :<json Array<Map<String, Any>> required messages: Specifies data to be sent through the DIDComm protocol.
  :<json Map<String, Any> required metadata: Specifies the metadata for sending messages.

  **Response JSON Objects:** Response JSON Objects follow the VerifiableCredentials data model. See `here <https://www.w3.org/TR/vc-data-model/#basic-concepts>`_ for details.

  :status 200: Success.
  :status 400: Bad Request.
  :status 401: Unauthorized.
  :status 403: Forbidden.
  :status 404: Not found.
  :status 409: Conflict.
  :status 500: Internal server error.

  **Example**:

  .. code-block:: python
    :linenos:
    :caption: Python

    from sock import post
    import json

    message = {
        "issuer": {
            "id": "did:nodex:test:EiD1T657Mh_WTL2P6tN2WuYwqiUe-QJgYOh6LFGX5PmXNQ"
        },
        "issuanceDate": "2024-03-28T11:56:36.876469+00:00",
        "@context": [
            "https://www.w3.org/2018/credentials/v1"
        ],
        "type": [
            "VerifiableCredential"
        ],
        "credentialSubject": {
            "container": {
                "created_at": "2024-03-28T11:56:36.876469+00:00",
                "destination_did": "did:nodex:test:EiD1T657Mh_WTL2P6tN2WuYwqiUe-QJgYOh6LFGX5PmXNQ",
                "message_id": "d3bda5b9-9fc8-4169-8725-e87e9d8a5ed5",
                "payload": "{\"message\": {\"string\": \"value\", \"number\": 1, \"boolean\": true, \"array\": [\"foo\", \"bar\", \"baz\"], \"map\": {\"key\": \"value\"}}}",
                "project_hmac": "7163c1c9be173e830e9bbe8d9020413770899b01a5153d331c56985a9a83c80b"
            }
        },
        "proof": {
            "type": "EcdsaSecp256k1Signature2019",
            "proofPurpose": "authentication",
            "created": "2024-03-28T11:56:36.945673+00:00",
            "verificationMethod": "did:nodex:test:EiD1T657Mh_WTL2P6tN2WuYwqiUe-QJgYOh6LFGX5PmXNQ#signingKey",
            "jws": "eyJhbGciOiJFUzI1NksiLCJiNjQiOmZhbHNlLCJjcml0IjpbImI2NCJdfQ..hsOsSYVBgeozKiPd_ryUt2zDEdoJLJWb-h-MBz6_A54DE6Vdxior3QEzxKflyiSpjpywCl92CxM09JCiszeI8Q",
            "controller": None,
            "challenge": None,
            "domain": None
        }
    }


    def main():
        payload = {
            "message": json.dumps(message),
        }

        json_response = post("/verify-verifiable-message", payload)

        print("The response is as follows.\n")
        print(json_response)


    if __name__ == "__main__":
        main()


  .. code-block:: json
    :linenos:
    :caption: Response (JSON)

    {
        "issuer": {
            "id": "did:nodex:test:EiD1T657Mh_WTL2P6tN2WuYwqiUe-QJgYOh6LFGX5PmXNQ"
        },
        "issuanceDate": "2024-03-28T11:56:36.876469+00:00",
        "@context": [
            "https://www.w3.org/2018/credentials/v1"
        ],
        "type": [
            "VerifiableCredential"
        ],
        "credentialSubject": {
            "container": {
                "created_at": "2024-03-28T11:56:36.876469+00:00",
                "destination_did": "did:nodex:test:EiD1T657Mh_WTL2P6tN2WuYwqiUe-QJgYOh6LFGX5PmXNQ",
                "message_id": "d3bda5b9-9fc8-4169-8725-e87e9d8a5ed5",
                "payload": "{\"message\": {\"string\": \"value\", \"number\": 1, \"boolean\": true, \"array\": [\"foo\", \"bar\", \"baz\"], \"map\": {\"key\": \"value\"}}}",
                "project_hmac": "7163c1c9be173e830e9bbe8d9020413770899b01a5153d331c56985a9a83c80b"
            }
        },
        "proof": {
            "type": "EcdsaSecp256k1Signature2019",
            "proofPurpose": "authentication",
            "created": "2024-03-28T11:56:36.945673+00:00",
            "verificationMethod": "did:nodex:test:EiD1T657Mh_WTL2P6tN2WuYwqiUe-QJgYOh6LFGX5PmXNQ#signingKey",
            "jws": "eyJhbGciOiJFUzI1NksiLCJiNjQiOmZhbHNlLCJjcml0IjpbImI2NCJdfQ..hsOsSYVBgeozKiPd_ryUt2zDEdoJLJWb-h-MBz6_A54DE6Vdxior3QEzxKflyiSpjpywCl92CxM09JCiszeI8Q",
            "controller": null,
            "challenge": null,
            "domain": null
        }
    }
```

## Low-Level API

### DID operations

#### Create DID

```{eval-rst}
.. http:post:: /identifiers

  Generate a new key ring and register it with DPKI.

  :<header Content\\-Type: Specifies :code:`application/json` as a fixed value.
  :>json String @context: Represents the context of this object.
  :>json Object didDocument: Represents a DID Document. Please refer to the `Decentralized Identifiers (DIDs) <https://www.w3.org/TR/did-core/>`_ specification for more information on this object.
  :>json String didDocument.id: Represents a DID.
  :>json Array<Object> didDocument.publicKey: The public keys associated with the DID are enumerated.
  :>json Object didDocument.publicKey.[number]: Represents a public key. Please refer to the `Ecdsa Secp256k1 Signature 2019 <https://w3c-ccg.github.io/lds-ecdsa-secp256k1-2019/>`_ specification for more information on this object.
  :>json Object methodMetadata: Represents metadata for the :code:`did:nodex` method. Please refer to the `Sidetree <https://identity.foundation/sidetree/spec/>`_ specification for more information on this object.
  :status 200: Success.
  :status 400: Bad request.
  :status 500: Internal server error.

  **Example**:

  .. code-block:: js
    :linenos:
    :caption: NodeJS

    import axios from 'axios'

    (async () => {
        const response = await axios.post('http:/localhost/identifiers', {}, {
            socketPath: '~/.nodex/run/nodex.sock',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    })()

  .. code-block:: json
    :linenos:
    :caption: Response (JSON)

    {
        "@context": "https://www.w3.org/ns/did-resolution/v1",
        "didDocument": {
            "id": "did:nodex:test:EiCwab0dfdUP1Ka9oZEBb7hVj3ZBPZ-tUGCM7nmceQjtOQ",
            "publicKey": [
                {
                    "id": "#signingKey",
                    "controller": "",
                    "type": "EcdsaSecp256k1VerificationKey2019",
                    "publicKeyJwk": {
                        "kty": "EC",
                        "crv": "secp256k1",
                        "x": "K6UbEvg_ZZGAYOLdqssmQNzY1Lj1eQrYebLiZ_4LQD4",
                        "y": "3JBpeezYsF0eF7aoOdIY7F4eHWfarZUyn7qnjQOpIvA"
                    }
                }
            ],
            "service": [
            ],
            "authentication": [
                "#signingKey"
            ]
        },
        "methodMetadata": {
            "published": false,
            "recoveryCommitment": "EiD-toxRcqSk6-FIpIr6fIrPwyJJhva-lW-EV4uSnm1BvA",
            "updateCommitment": "EiCSqEXRpfom3o7DwBTlIOvw2jPUMb2HWE6OTUtNzHuTgQ"
        }
    }
```

#### Find DID

```{eval-rst}
.. http:get:: /identifiers/(string:did)

  It acts as a Universal Resolver and returns the corresponding DID Document.

  :<header Content\\-Type: Specifies :code:`application/json` as a fixed value.
  :>json String @context: Represents the context of this object.
  :>json Object didDocument: Represents a DID Document. Please refer to the `Decentralized Identifiers (DIDs) <https://www.w3.org/TR/did-core/>`_ specification for more information on this object.
  :>json String didDocument.id: Represents a DID.
  :>json Array<Object> didDocument.publicKey: The public keys associated with the DID are enumerated.
  :>json Object didDocument.publicKey.[number]: Represents a public key. Please refer to the `Ecdsa Secp256k1 Signature 2019 <https://w3c-ccg.github.io/lds-ecdsa-secp256k1-2019/>`_ specification for more information on this object.
  :>json Object methodMetadata: Represents metadata for the :code:`did:nodex` method. Please refer to the `Sidetree <https://identity.foundation/sidetree/spec/>`_ specification for more information on this object.
  :status 200: Success.
  :status 400: Bad request.
  :status 500: Internal server error.

  **Example**:

  .. code-block:: js
    :linenos:
    :caption: NodeJS

    import axios from 'axios'

    (async () => {
        const response = await axios.post('http:/localhost/identifiers/did:nodex:test:...', {}, {
            socketPath: '~/.nodex/run/nodex.sock',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    })()

  .. code-block:: json
    :linenos:
    :caption: Response (JSON)

    {
        "@context": "https://www.w3.org/ns/did-resolution/v1",
        "didDocument": {
            "id": "did:nodex:test:EiCwab0dfdUP1Ka9oZEBb7hVj3ZBPZ-tUGCM7nmceQjtOQ",
            "publicKey": [
                {
                    "id": "#signingKey",
                    "controller": "",
                    "type": "EcdsaSecp256k1VerificationKey2019",
                    "publicKeyJwk": {
                        "kty": "EC",
                        "crv": "secp256k1",
                        "x": "K6UbEvg_ZZGAYOLdqssmQNzY1Lj1eQrYebLiZ_4LQD4",
                        "y": "3JBpeezYsF0eF7aoOdIY7F4eHWfarZUyn7qnjQOpIvA"
                    }
                }
            ],
            "service":[
            ],
            "authentication": [
                "#signingKey"
            ]
        },
        "methodMetadata": {
            "published": false,
            "recoveryCommitment": "EiD-toxRcqSk6-FIpIr6fIrPwyJJhva-lW-EV4uSnm1BvA",
            "updateCommitment": "EiCSqEXRpfom3o7DwBTlIOvw2jPUMb2HWE6OTUtNzHuTgQ"
        }
    }
```

### Credential operations

#### Generate VC

```{eval-rst}
.. http:post:: /internal/verifiable-credentials

  Generate and return a Verifiable Credential in accordance with W3C standards.

  :<header Content\\-Type: Specifies :code:`application/json` as a fixed value.
  :<json Map<String, Any> required message: Specifies the payload to wrap as VC.
  :status 200: Success.
  :status 400: Bad request.
  :status 500: Internal server error.

  **Example**:

  .. code-block:: js
    :linenos:
    :caption: NodeJS

    import axios from 'axios'

    (async () => {
        const response = await axios.post('http:/localhost/internal/verifiable-credentials', {
            message: {
                string: 'value',
                number: 1,
                boolean: true,
                array: [],
                map: {}
            }
        }, {
            socketPath: '~/.nodex/run/nodex.sock',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    })()
```

#### Verify VC

```{eval-rst}
.. http:post:: /internal/verifiable-credentials/verify

  Verifies a Verifiable Credential generated according to W3C standards.

  :<header Content\\-Type: Specifies :code:`application/json` as a fixed value.
  :<json String required message: Specify the VC to be verified.
  :status 200: Success.
  :status 400: Bad request.
  :status 500: Internal server error.

  **Example**:

  .. code-block:: js
    :linenos:
    :caption: NodeJS

    import axios from 'axios'

    (async () => {
        const response = await axios.post('http:/localhost/internal/verifiable-credentials/verify', {
            message: '...'
        }, {
            socketPath: '~/.nodex/run/nodex.sock',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    })()
```

#### Generate DIDComm Plaintext Message

```{eval-rst}
.. http:post:: /internal/didcomm/plaintext-messages

  Generates and returns a DIDComm plaintext message in accordance with W3C standards.

  :<header Content\\-Type: Specifies :code:`application/json` as a fixed value.
  :<json Array<String> required destinations: Specifies the destination DID.
  :<json Map<String, Any> required message: Specifies the payload to wrap as a DIDComm plaintext message.
  :status 200: Success.
  :status 400: Bad request.
  :status 500: Internal server error.

  **Example**:

  .. code-block:: js
    :linenos:
    :caption: NodeJS

    import axios from 'axios'

    (async () => {
        const response = await axios.post('http:/localhost/internal/didcomm/plaintext-messages', {
            destinations: [ 'did:nodex:test:...' ],
            message: {
                string: 'value',
                number: 1,
                boolean: true,
                array: [],
                map: {}
            }
        }, {
            socketPath: '~/.nodex/run/nodex.sock',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    })()
```

#### Verify DIDComm Plaintext Message

```{eval-rst}
.. http:post:: /internal/didcomm/plaintext-messages/verify

  Validates DIDComm plaintext messages generated according to W3C standards.

  :<header Content\\-Type: Specifies :code:`application/json` as a fixed value.
  :<json String required message: Specifies the DIDComm plaintext message to be verified.
  :status 200: Success.
  :status 400: Bad request.
  :status 500: Internal server error.

  **Example**:

  .. code-block:: js
    :linenos:
    :caption: NodeJS

    import axios from 'axios'

    (async () => {
        const response = await axios.post('http:/localhost/internal/didcomm/plaintext-messages/verify', {
            message: '...'
        }, {
            socketPath: '~/.nodex/run/nodex.sock',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    })()
```

#### Generate DIDComm Signed Message

```{eval-rst}
.. http:post:: /internal/didcomm/signed-messages

  Generate and return a DIDComm signed message in accordance with W3C standards.

  :<header Content\\-Type: Specifies :code:`application/json` as a fixed value.
  :<json Array<String> required destinations: Specifies the destination DID.
  :<json Map<String, Any> required message: Specifies the payload to be wrapped as a DIDComm signed message.
  :status 200: Success.
  :status 400: Bad request.
  :status 500: Internal server error.

  **Example**:

  .. code-block:: js
    :linenos:
    :caption: NodeJS

    import axios from 'axios'

    (async () => {
        const response = await axios.post('http:/localhost/internal/didcomm/signed-messages', {
            destinations: [ 'did:nodex:test:...' ],
            message: {
                string: 'value',
                number: 1,
                boolean: true,
                array: [],
                map: {}
            }
        }, {
            socketPath: '~/.nodex/run/nodex.sock',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    })()
```

#### Verify DIDComm Signed Message

```{eval-rst}
.. http:post:: /internal/didcomm/signed-messages/verify

  Verifies DIDComm signed messages generated according to W3C standards.

  :<header Content\\-Type: Specifies :code:`application/json` as a fixed value.
  :<json String required message: Specifies the DIDComm signed message to be verified.
  :status 200: Success.
  :status 400: Bad request.
  :status 500: Internal server error.

  **Example**:

  .. code-block:: js
    :linenos:
    :caption: NodeJS

    import axios from 'axios'

    (async () => {
        const response = await axios.post('http:/localhost/internal/didcomm/signed-messages/verify', {
            message: '...'
        }, {
            socketPath: '~/.nodex/run/nodex.sock',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    })()
```

#### Generate DIDComm Encrypted Message

```{eval-rst}
.. http:post:: /internal/didcomm/encrypted-messages

  Generate and return a DIDComm encrypted message according to W3C standards.

  :<header Content\\-Type: Specifies :code:`application/json` as a fixed value.
  :<json Array<String> required destinations: Specifies the destination DID.
  :<json Map<String, Any> required message: Specifies the payload to wrap as a DIDComm encrypted message.
  :status 200: Success.
  :status 400: Bad request.
  :status 500: Internal server error.

  **Example**:

  .. code-block:: js
    :linenos:
    :caption: NodeJS

    import axios from 'axios'

    (async () => {
        const response = await axios.post('http:/localhost/internal/didcomm/encrypted-messages', {
            destinations: [ 'did:nodex:test:...' ],
            message: {
                string: 'value',
                number: 1,
                boolean: true,
                array: [],
                map: {}
            }
        }, {
            socketPath: '~/.nodex/run/nodex.sock',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    })()
```

#### Verify DIDComm Encrypted Message

```{eval-rst}
.. http:post:: /internal/didcomm/encrypted-messages/verify

  Validates DIDComm encrypted messages generated according to W3C standards.

  :<header Content\\-Type: Specifies :code:`application/json` as a fixed value.
  :<json String required message: Specifies the DIDComm encrypted message to be verified.
  :status 200: Success.
  :status 400: Bad request.
  :status 500: Internal server error.

  **Example**:

  .. code-block:: js
    :linenos:
    :caption: NodeJS

    import axios from 'axios'

    (async () => {
        const response = await axios.post('http:/localhost/internal/didcomm/encrypted-messages/verify', {
            message: '...'
        }, {
            socketPath: '~/.nodex/run/nodex.sock',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    })()
```

