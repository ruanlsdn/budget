import { useNavigation } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import { useContext, useState } from "react";
import {
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/Feather";
import { captureScreen } from "react-native-view-shot";
import { ProductsContext } from "../../contexts/products";
import { SelectedProductsContext } from "../../contexts/selectedProducts";
import DateTimePicker from "@react-native-community/datetimepicker";
import { base64 } from "../../utils";
import { AuthContext } from "../../contexts/auth";

export default function headerRight() {
  const { user } = useContext(AuthContext);
  const [dataEntrega, setDataEntrega] = useState(null);
  const [horaEntrega, setHoraEntrega] = useState(null);
  const [modal, setModal] = useState(false);
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [isPrinting, setIsPrinting] = useState(false);
  const date = new Date();
  const { products } = useContext(ProductsContext);
  const { selectedProducts, reset, setResetFlag } = useContext(
    SelectedProductsContext
  );
  const navigation = useNavigation();
  var totalAmount = 0;
  var totalSum = 0;

  const productsHtml = () => {
    totalAmount = 0;
    totalSum = 0;
    var output = ``;
    for (let j = 0; j < selectedProducts.length; j++) {
      if (products.includes(selectedProducts[j].product)) {
        totalAmount += parseInt(selectedProducts[j].amount);
        totalSum += parseFloat(
          selectedProducts[j].amount * selectedProducts[j].product.price
        );
        output += `<tr>
        <td align="center">
           <b>X</b>
        </td>
        <td align="center">
           <b>${selectedProducts[j].amount}</b>
        </td>
        <td align="center">
           <b>${selectedProducts[j].product.description}</b>
        </td>
        <td align="center">
           <b>R$ ${parseFloat(selectedProducts[j].product.price).toFixed(2)}</b>
        </td>
        <td align="center">
           <b>R$ ${parseFloat(
             selectedProducts[j].amount * selectedProducts[j].product.price
           ).toFixed(2)}</b>
        </td>
     </tr>
         `;
      }
    }
    return output;
  };

  const productsTxt = () => {
    var output = ``;
    for (let j = 0; j < selectedProducts.length; j++) {
      if (products.includes(selectedProducts[j].product)) {
        let fontSize = "50px";

        if (selectedProducts[j].product.description.length > 19)
          fontSize = "49px";

        totalAmount += parseInt(selectedProducts[j].amount);
        totalSum += parseFloat(
          selectedProducts[j].amount * selectedProducts[j].product.price
        );

        output += `
        <div style="display: flex; flex-direction: row; align-items: center; width: 100%" >
            <div style=" display: flex; width: 10%; align-items: center; justify-content: flex-start;">
                <b style="font-size: 50px">${selectedProducts[j].amount}</b>
            </div>
            <div style=" display: flex; width: 45%; align-items: center; justify-content: center; text-align: center;">
                <b style="font-size: ${fontSize}">${
          selectedProducts[j].product.description
        }</b>
            </div>
            <div style=" display: flex; width: 20%; align-items: center; justify-content: center;">
                <b style="font-size: 50px">R$ ${parseFloat(
                  selectedProducts[j].product.price
                ).toFixed(2)}</b>
            </div>
            <div style=" display: flex; width: 25%; align-items: center; justify-content: flex-end;">
                <b style="font-size: 50px">R$ ${parseFloat(
                  selectedProducts[j].amount * selectedProducts[j].product.price
                ).toFixed(2)}</b>
            </div>
        </div>
        `;
      }
    }
    return output;
  };

  const htmlTxt = `
    <html>
      <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
      </head>
      <body>
          <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;" >
            <b style="font-size: 60px">${user.name === "rc" ? "RC CHURRASCO" : user.name.toUpperCase()}</b>
            <b style="font-size: 45px">===========================================</b>
          </div>
          <div style="display: flex; flex-direction: column;" >
            <b style="font-size: 60px">CLIENTE: ${
              nome ? nome.toUpperCase() : ""
            }</b>
            ${
              endereco
                ? `<b style="font-size: 60px">ENDEREÇO: ${endereco.toUpperCase()}</b>`
                : ""
            }
            ${
              dataEntrega
                ? `<b style="font-size: 60px">AGENDADO PARA:  ${dataEntrega}  ${
                    horaEntrega
                      ? " - " +
                        new Date(horaEntrega)
                          .toLocaleTimeString()
                          .substring(0, 5)
                      : ""
                  }</b>`
                : ""
            }
            <b style="font-size: 45px">===========================================</b>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;" >
            <b style="font-size: 60px">PEDIDO</b>
            <b style="font-size: 45px">===========================================</b>
          </div>
          <div style="display: flex; flex-direction: row; align-items: center; width: 100%" >
            <div style="width: 10%; display: flex; align-items: center; justify-content: flex-start;">
                <b style="font-size: 50px">QTD</b>
            </div>
            <div style="width: 45%; display: flex; align-items: center; justify-content: center;">
                <b style="font-size: 50px">DESCRIÇÃO</b>
            </div>
            <div style="width: 20%;  display: flex; align-items: center; justify-content: center;">
                <b style="font-size: 50px">UNID</b>
            </div>
            <div style="width: 25%;  display: flex; align-items: center; justify-content: flex-end;">
                <b style="font-size: 50px">SUBTOTAL</b>
            </div>
          </div>
          ${productsTxt()}
          <b style="font-size: 45px">===========================================</b>
          <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;" >
            <b style="font-size: 60px">RESUMO DO PEDIDO</b>
            <b style="font-size: 45px">===========================================</b>
          </div>
          <div style="display: flex; flex-direction: row; align-items: center; justify-content: space-between;" >
            <b style="font-size: 60px">QUANT. ITENS</b>
            <b style="font-size: 60px">TOTAL</b>
          </div>
          <div style="display: flex; flex-direction: row; align-items: center; justify-content: space-between;" >
            <b style="font-size: 60px">${totalAmount}</b>
            <b style="font-size: 60px">R$ ${totalSum.toFixed(2)}</b>
          </div>
          <b style="font-size: 45px">===========================================</b>
          <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; margin-top: 50px">
            <b style="font-size: 60px">***ESTE NÃO É UM TICKET FISCAL***</b>
            <b style="font-size: 45px; text-align: center; margin-top: 50px">
              Ticket gerado em 
                ${
                  date.getDate().toString().length < 2
                    ? "0" + date.getDate()
                    : date.getDate()
                }/${
    (date.getMonth() + 1).toString().length < 2
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1
  }/${date.getFullYear()} às ${date.toLocaleTimeString("pt-BR")}.
            </b>
          </div>
      </body>
    </html>
  `;

  const html = `
      <html>
       <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
       </head>
       <style>
    table {
      font-family: arial, sans-serif;
      width: 100%;
    }

    td, th {
      border: 1px solid #dddddd;
    }

    </style>
       <body>
          <div style="display: flex; flex-direction: row;">
             <table width="100%">
                <tr>
                   <th width="10%">
                      ${base64}
                   </th>
                   <th width="40%">
                      <div style="display: flex; flex-direction: column; padding: 10px;">
                         <b>RC CHURRASCO</b>
                         <b>QNO 16 CONJUNTO 35 CASA 17</b>
                         <b>BRASÍLIA - DISTRITO FEDERAL</b>
                         <b>(61) 98179-9160 (ROBERTO)</b>
                      </div>
                   </th>
                   <th width="50%">
                      <b style="position: absolute; right: 20px; top: 20px">N°: ${(
                        Math.random() * (10000 - 1) +
                        1
                      ).toFixed()}</b>
                   </th>
                </tr>
             </table>
          </div>
          <div style="display: flex; flex-direction: row; align-items: center; justify-content: center; background-color: #dddddd; height: 25px" >
             <p>DADOS DO CLIENTE</p>
          </div>
          <table width="100%">
             <tr>
                <th width="20%">
                   <b>NOME DO CLIENTE: </b>
                </th>
                <th width="80%" align="left">
                   <b>${nome}</b>
                </th>
             </tr>
          </table>
          <div style="display: flex; flex-direction: row; align-items: center; justify-content: center; background-color: #dddddd; height: 25px" >
             <p>PEDIDO</p>
          </div>
          <table width="100%">
             <tr>
                <th width="10%" align="center">
                   <b>INCLUIR</b>
                </th>
                <th width="15%" align="center">
                   <b>QUANTIDADE</b>
                </th>
                <th width="40%" align="center">
                   <b>DESCRIÇÃO</b>
                </th>
                <th width="10%" align="center">
                   <b>PREÇO UNITÁRIO</b>
                </th>
                <th width="20%" align="center">
                   <b>TOTAL</b>
                </th>
             </tr>
             ${productsHtml()}
          </table>
          <div style="display: flex; flex-direction: row; align-items: center; justify-content: center; background-color: #dddddd; height: 25px" >
             <p>RESUMO DO PEDIDO</p>
          </div>
          <div>
             <table style="width:100%">
                <tr>
                   <th style="width: 50%">
                      QUANTIDADE TOTAL
                   </th>
                   <th style="width: 50%">
                      SOMATÓRIO DO PEDIDO
                   </th>
                </tr>
                <tr>
                   <td align="center">
                      <b>${totalAmount}</b>
                   </td>
                   <td align="center">
                      <b> R$ ${parseFloat(totalSum).toFixed(2)}</b>
                   </td>
                </tr>
             </table>
          </div>
          <table style="position: absolute; bottom: 0" width="100%">
             <tr>
                <th>
                   <b>Documento gerado em ${date.getDate()}/${
    (date.getMonth() + 1).toString().length < 2
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1
  }/${date.getFullYear()} às ${date.toLocaleTimeString(
    "pt-BR"
  )} via aplicativo.</b>
                </th>
             </tr>
          </table>
       </body>
    </html>
    `;

  const generateTxt = async () => {
    setModal(false);
    const response = await Print.printToFileAsync({ html: htmlTxt });
    const pdfName = `${response.uri.slice(
      0,
      response.uri.lastIndexOf("/") + 1
    )}pedido_${nome}_${
      date.getDate().toString().length < 2
        ? "0" + date.getDate()
        : date.getDate()
    }_${
      (date.getMonth() + 1).toString().length < 2
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1
    }_${date.getFullYear()}.pdf`;

    await FileSystem.moveAsync({
      from: response.uri,
      to: pdfName,
    });

    await shareAsync(pdfName);

    setNome("");
    setEndereco("");
    setDataEntrega(null);
    setHoraEntrega(null);
  };

  const generatePdf = async () => {
    setModal(false);
    const response = await Print.printToFileAsync({ html: html });
    const pdfName = `${response.uri.slice(
      0,
      response.uri.lastIndexOf("/") + 1
    )}pedido_${nome}_${
      date.getDate().toString().length < 2
        ? "0" + date.getDate()
        : date.getDate()
    }_${
      date.getMonth().toString().length < 2
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1
    }_${date.getFullYear()}.pdf`;

    await FileSystem.moveAsync({
      from: response.uri,
      to: pdfName,
    });
    await shareAsync(pdfName);

    setNome("");
    setEndereco("");
    setDataEntrega(null);
    setHoraEntrega(null);
  };

  const captureAndShare = () => {
    setTimeout(async () => {
      const response = await captureScreen();
      await shareAsync(response);
    }, 500);
  };

  const [show, setShow] = useState(false);
  const [showTime, setShowTime] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = new Date(selectedDate);
    setShow(false);
    setDataEntrega(`${
      currentDate.getDate().toString().length < 2
        ? "0" + currentDate.getDate()
        : currentDate.getDate()
    }/${
      currentDate.getMonth().toString().length < 2
        ? "0" + (currentDate.getMonth() + 1)
        : currentDate.getMonth() + 1
    }/${currentDate.getFullYear()}
    `);
  };

  const onChangeTime = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowTime(false);
    setHoraEntrega(currentDate);
  };

  return (
    <>
      <Modal animationType="slide" transparent={true} visible={modal}>
        <View style={styles.centeredView}>
          <View
            style={{
              padding: 15,
              height: !isPrinting ? 250 : 350,
              width: "90%",
              backgroundColor: "white",
              borderRadius: 20,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <View style={styles.modalHeader}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                INFORMAÇÕES DO PEDIDO
              </Text>
              <TouchableOpacity
                style={{ alignItems: "center", position: "absolute", right: 0 }}
                onPress={() => setModal(!modal)}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  X
                </Text>
              </TouchableOpacity>
            </View>
            <TextInput
              onChangeText={(text) => setNome(text)}
              mode="outlined"
              activeOutlineColor="black"
              style={{
                borderRadius: 5,
                height: 50,
                backgroundColor: "white",
              }}
              label="Nome do cliente"
            />
            {isPrinting ? (
              <>
                <TextInput
                  onChangeText={(text) => setEndereco(text)}
                  mode="outlined"
                  activeOutlineColor="black"
                  style={{
                    borderRadius: 5,
                    height: 50,
                    backgroundColor: "white",
                  }}
                  label="Endereço do cliente"
                />
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <TouchableOpacity
                    style={{
                      height: 50,
                      width: "50%",
                      backgroundColor: "#253743",
                      borderRadius: 5,
                      marginTop: 6,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={() => setShow(true)}
                  >
                    <Text style={{ color: "#FFF", fontSize: 15 }}>DATA</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      height: 50,
                      width: "50%",
                      backgroundColor: "#253743",
                      borderRadius: 5,
                      marginTop: 6,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={() => setShowTime(true)}
                  >
                    <Text style={{ color: "#FFF", fontSize: 15 }}>HORA</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : null}

            {isPrinting ? (
              <TouchableOpacity style={styles.buttonForm} onPress={generateTxt}>
                <Text style={{ color: "#FFF" }}>IMPRIMIR</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.buttonForm} onPress={generatePdf}>
                <Text style={{ color: "#FFF" }}>GERAR PDF</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
      <TouchableOpacity style={{ marginRight: 20 }} onPress={captureAndShare}>
        <Icon color="white" name="share-2" size={20} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{ marginRight: 20 }}
        onPress={() => {
          reset();
          setResetFlag(1);
          navigation.goBack();
        }}
      >
        <Icon color="white" name="refresh-cw" size={20} />
      </TouchableOpacity>
      {user.name === "rc" && (
        <TouchableOpacity
          onPress={() => {
            setIsPrinting(false);
            setModal(true);
          }}
          style={{ marginRight: 20 }}
        >
          <Icon color="white" name="file-text" size={20} />
        </TouchableOpacity>
      )}
      <TouchableOpacity
        onPress={() => {
          setIsPrinting(true);
          setModal(true);
        }}
      >
        <Icon color="white" name="printer" size={20} />
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={"date"}
          is24Hour={true}
          onChange={onChangeDate}
        />
      )}
      {showTime && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={"time"}
          is24Hour={true}
          onChange={onChangeTime}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    padding: 15,
    height: 300,
    width: "90%",
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    height: 50,
    flexDirection: "row",
  },
  buttonForm: {
    backgroundColor: "#253743",
    borderRadius: 20,
    alignSelf: "center",
    width: "100%",
    height: 50,
    marginTop: 35,
    alignItems: "center",
    justifyContent: "center",
  },
});
