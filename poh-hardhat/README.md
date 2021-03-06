# POH Tools

A collection of tools to develop on the Proof of Humanity ecosystem

## POH Dummy

POH Dummy is a dummy smart contract to simulate a registry, the same way proof of humanity does.
As of the current version is very basic. It allows to register the calling address by passing an expiration date.

POHDummy does not replicate the Proof of HUmanity contract behaviours and registration stages. It's rather a simple contract that allows to simulate the validation of a registered user using the same function as in POH (`isRegistered(address)`), by making easy it to register or unregister an address.

### Functions:

- `register(uint256 expiration)`: Registers the sender with the indicated `expiration` date. `expiration` is a UNIX timestamp and must be in the future.
- `unregister()`: Unregisters the sender, as long as it was registered.
- `isRegistered(address account)`: Indicates if the account is registered in the registry. An account is considered to be registered if it's expiration date is greater than the current `block.timestamp`.

## Deployments:

- Kiln: [0xde4ABEdd6527e4DcBBd50221734Ff5A609bE275C](https://explorer.kiln.themerge.dev/address/0xde4ABEdd6527e4DcBBd50221734Ff5A609bE275C)
- Kovan: [0xe35ABd08eb021603488138e128e9D80a83c50408](https://kovan.etherscan.io/address/0xe35ABd08eb021603488138e128e9D80a83c50408)
