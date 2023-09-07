import abi from './contractAbi';
const {Web3} = require('web3')

let selectedAccount, TestContract, isInitialized = false, gasPrice;
const contract_address = "0xd1EAE6f9A1F524E2C373bB28aE8dF0c11a06CA82";

//"0x31Ca3E861f792541F43910e7eeE2b7deDC72DCE2";
let balance;
export const init = async () => {

    // if (typeof window.ethereum !== 'undefined') {
      const web3 = new Web3(new Web3.providers.HttpProvider("https://neat-damp-general.matic-testnet.discover.quiknode.pro/f9d254bd6d1f17ab2e20a1bb2446a973c57890da/"));
      try {
        await window.ethereum.enable();
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts.length === 0) {
            console.error("MetaMask is not connected to an account.");
            return;
        }
        selectedAccount = accounts[0];
        console.log(`Selected account is ${selectedAccount}`);
        window.ethereum.on('accountsChanged', function (accounts) {
          selectedAccount = accounts[0];
          console.log(`Account changed to ${selectedAccount}`);
        });
        balance = await web3.eth.getBalance(selectedAccount);
        const network = await web3.eth.net.getId(); //80001n
        gasPrice = await web3.eth.getGasPrice()
        TestContract = new web3.eth.Contract(abi, contract_address);
        isInitialized = true;
      } catch (err) {
        console.log(err);
        return;
      }
    // }
  };
  

export const contractFunction = async (formData) => {
  console.log("form data =========>>>>>", formData);
    if(!isInitialized){
        await init();
    }
    const gasEstimate = await TestContract.methods
   .createManufacturer( formData.Mname, formData.Memailid, formData.Maddress, formData.mDate)
   .estimateGas({ from: selectedAccount });
 
 if (balance < gasEstimate * gasPrice) {
   alert("Insufficient balance in the wallet.");
   return;
  }
    const checksummedAddress = Web3.utils.toChecksumAddress(selectedAccount);
    //const gasPrice = await Web3.eth.gasPrice();
    const transactionParameters = {
      from: selectedAccount,
      to: contract_address,
      data: TestContract.methods.createManufacturer(
        formData.Mname,
        formData.Memailid,
        formData.Maddress,
        formData.mDate
      ).encodeABI(),
      gasPrice: gasPrice.result, // custom gas price
  };
  let response = await window.ethereum.request({
    method: 'eth_sendTransaction',
    params: [transactionParameters],
});


    return response
};


export const Supplier = async (Supplier) => {
  console.log("form data =========>>>>>", Supplier);
    if(!isInitialized){
        await init();
    }
    
    const checksummedAddress = Web3.utils.toChecksumAddress(selectedAccount);
    //const gasPrice = await Web3.eth.gasPrice();
    const transactionParameters = {
      from: selectedAccount,
      to: contract_address,
      data: TestContract.methods.createSupplier(
        Supplier.Sname,
        Supplier.Semailid,
        Supplier.Saddress,
        Supplier.SDate,
      ).encodeABI(),
      gasPrice: gasPrice.result, // custom gas price
  };
  let response = await window.ethereum.request({
    method: 'eth_sendTransaction',
    params: [transactionParameters],
});


    return response
};


export const Product = async (product) => {
  console.log("form data =========>>>>>", product);
    if(!isInitialized){
        await init();
    }
    
    const checksummedAddress = Web3.utils.toChecksumAddress(selectedAccount);
    //const gasPrice = await Web3.eth.gasPrice();
    const transactionParameters = {
      from: selectedAccount,
      to: contract_address,
      data: TestContract.methods.createProduct(
        product.Pname,
        product.Pprice,
        product.Pquantity,
        product.manufacturerIndex,
        product.supplierIndex,
      ).encodeABI(),
      gasPrice: gasPrice.result, // custom gas price
  };
  let response = await window.ethereum.request({
    method: 'eth_sendTransaction',
    params: [transactionParameters],
});


    return response
};

export const User = async (user) => {
  console.log("form data =========>>>>>", user);
    if(!isInitialized){
        await init();
    }
    
    const checksummedAddress = Web3.utils.toChecksumAddress(selectedAccount);
    //const gasPrice = await Web3.eth.gasPrice();
    const transactionParameters = {
      from: selectedAccount,
      to: contract_address,
      data: TestContract.methods.createUser(
        user.Uname,
        user.Uaddress,
        user.Uemail,
        user.Uregisterdate,
      ).encodeABI(),
      gasPrice: gasPrice.result, // custom gas price
  };
  let response = await window.ethereum.request({
    method: 'eth_sendTransaction',
    params: [transactionParameters],
});
}

export const newowner = async (owner) => {
  console.log("form data =========>>>>>", owner);
    if(!isInitialized){
        await init();
    }
    
    const checksummedAddress = Web3.utils.toChecksumAddress(selectedAccount);
    //const gasPrice = await Web3.eth.gasPrice();
    const transactionParameters = {
      from: selectedAccount,
      to: contract_address,
      data: TestContract.methods.buyProduct(
        parseInt(owner.ID),
        owner.Owner,
        
      ).encodeABI(),
      gasPrice: gasPrice.result, // custom gas price
  };
  let response = await window.ethereum.request({
    method: 'eth_sendTransaction',
    params: [transactionParameters],
});
console.log("Response from contract: ",response);
console.log(typeof(owner.ID))
const resp = await TestContract.methods.getProductDetailsByName(parseInt(owner.ID)).call();
console.log(resp);
const updatedProduct = [resp.manufacturerIndex, resp.supplierIndex, resp.name, resp.price];
console.log(updatedProduct);
return response, updatedProduct;
};