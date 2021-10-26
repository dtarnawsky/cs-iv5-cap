import { Injectable } from '@angular/core';
import { Device, DeviceSecurityType, IdentityVaultConfig, Vault, VaultType } from '@ionic-enterprise/identity-vault';

@Injectable({
  providedIn: 'root'
})
export class VaultService {
  config = { environment: 'prod', clientCode: 'code' };
  vault: Vault;
  secStorageVault: Vault;

  constructor() {
    const config: IdentityVaultConfig = {
      key: `com.${this.config.environment}.identity.${this.config.clientCode}`,
      type: VaultType.DeviceSecurity,
      deviceSecurityType: DeviceSecurityType.Both,
      lockAfterBackgrounded: 5000
    };

    const secureStorageVaultConfig: IdentityVaultConfig = {
      key: `com.${this.config.environment}.identity_ss.${this.config.clientCode}`,
      type: VaultType.SecureStorage,
      deviceSecurityType: DeviceSecurityType.None
    };

    console.log('here');

    this.vault = new Vault(config);
    this.secStorageVault = new Vault(secureStorageVaultConfig);
    this.hide();
    console.log('here2');
  }

  async hide() {
    await Device.setHideScreenOnBackground(true);
  }

}
