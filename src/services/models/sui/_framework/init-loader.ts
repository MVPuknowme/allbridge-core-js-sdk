// @ts-nocheck
import * as package_4931e06dce648b3931f890035bd196920770e913e43e45990b383f6486fdd0a5 from "../_dependencies/message-transmitter/init";
import * as package_346e3233f61eb0055713417bfaddda7dc3bf26816faad1f7606994a368b92917 from "../_dependencies/stablecoin/init";
import * as package_1 from "../_dependencies/std/init";
import * as package_2 from "../_dependencies/sui/init";
import * as package_31cc14d80c175ae39777c0238f20594c6d4869cfab199f40b69f3319956b8beb from "../_dependencies/token-messenger-minter/init";
import * as package_f47329f4344f3bf0f8e436e2f7b485466cff300f12a166563995d3888c296a94 from "../_dependencies/wormhole/init";
import * as package_a2b1c8af2a4f4624362c4a7d0f91fb6b0921e780ffb2c07701901c734d75d2e3 from "../bridge/init";
import * as package_cfb3ada02ea9b40f2beb396f5f781689a2f6862d224e6c9854e175d14278f9f5 from "../cctp-bridge/init";
import * as package_34ae5595909bdfcd61191f6e5aabf0024250194f738b82df186fdd4fb18aa7ec from "../gas-oracle/init";
import * as package_73d4d15293c2482646cdfc28c58da0f9eef64c577e9c0d2bbf614c1623346b49 from "../messenger/init";
import * as package_4dacc15807ba7ccfcdfcc2d0498401bbf504d112a5959323660d757a02b850d4 from "../utils/init";
import * as package_6ec1db2511d2283fc945d62f6c8e5305ee2538f2168fe91477f68c574d28be1 from "../wormhole-messenger/init";
import { StructClassLoader } from "./loader";

export function registerClasses(loader: StructClassLoader): void {
  package_1.registerClasses(loader);
  package_2.registerClasses(loader);
  package_6ec1db2511d2283fc945d62f6c8e5305ee2538f2168fe91477f68c574d28be1.registerClasses(loader);
  package_31cc14d80c175ae39777c0238f20594c6d4869cfab199f40b69f3319956b8beb.registerClasses(loader);
  package_346e3233f61eb0055713417bfaddda7dc3bf26816faad1f7606994a368b92917.registerClasses(loader);
  package_34ae5595909bdfcd61191f6e5aabf0024250194f738b82df186fdd4fb18aa7ec.registerClasses(loader);
  package_4931e06dce648b3931f890035bd196920770e913e43e45990b383f6486fdd0a5.registerClasses(loader);
  package_4dacc15807ba7ccfcdfcc2d0498401bbf504d112a5959323660d757a02b850d4.registerClasses(loader);
  package_73d4d15293c2482646cdfc28c58da0f9eef64c577e9c0d2bbf614c1623346b49.registerClasses(loader);
  package_a2b1c8af2a4f4624362c4a7d0f91fb6b0921e780ffb2c07701901c734d75d2e3.registerClasses(loader);
  package_cfb3ada02ea9b40f2beb396f5f781689a2f6862d224e6c9854e175d14278f9f5.registerClasses(loader);
  package_f47329f4344f3bf0f8e436e2f7b485466cff300f12a166563995d3888c296a94.registerClasses(loader);
}
