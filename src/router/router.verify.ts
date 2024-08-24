import {
  NExpressVerificationOptions,
  NExpressVerificationTypes,
  verificationFunction,
  verificationFunctionOptions,
} from "@/types";
import { stack, StackProcessor } from "@strbjun/nvalidators";
import { NextFunction, Request, Response, Router } from "express";

const getValue = (
  req: Request,
  type: NExpressVerificationTypes,
  param: string,
  id?: unknown,
) => {
  switch (type) {
    case NExpressVerificationTypes.QUERY:
      return req.query[param];
    case NExpressVerificationTypes.BODY:
      return req.body[param];
    case NExpressVerificationTypes.PARAMS:
      return id;
    default:
      return null;
  }
};

const setValue = (
  type: string,
  param: string,
  newValue: unknown,
  options: verificationFunctionOptions,
) => {
  switch (type) {
    case NExpressVerificationTypes.QUERY:
      if (options?.req?.query) {
        options.req.query[param] = newValue as string;
      }
      break;
    case NExpressVerificationTypes.BODY:
      if (options?.req?.body) {
        options.req.body[param] = newValue;
      }
      break;
    case NExpressVerificationTypes.PARAMS:
      if (options?.req?.params) {
        options.req.params[param] = newValue as string;
      }
      break;
  }
};

const handle = (
  type: string,
  param: string,
  action: verificationFunction | StackProcessor,
  value: unknown,
  options: verificationFunctionOptions,
) => {
  if (typeof action === "object") {
    return stack(value, action, {
      setter: (newValue) => setValue(type, param, newValue, options),
    });
  } else {
    return action(value, options);
  }
};

function handleVerifyItem(
  action: verificationFunction | StackProcessor,
  param: string,
  type: NExpressVerificationTypes,
) {
  return (req: Request, res: Response, next: NextFunction, id?: unknown) => {
    const value = getValue(req, type, param, id);
    if (
      handle(type, param, action, value, {
        paramName: param,
        type,
        req,
        res,
        next,
      })
    ) {
      next();
    } else {
      res.status(400).json({
        message: `Failed verification check`,
        error: {
          param,
          type,
          value,
        },
      });
    }
  };
}

export function handleVerify(
  verify: NExpressVerificationOptions,
  router: Router,
  path: string,
) {
  Object.keys(verify).forEach((type) => {
    Object.keys(verify[type as NExpressVerificationTypes]).forEach((param) => {
      switch (type) {
        case NExpressVerificationTypes.QUERY:
          router.use(path, handleVerifyItem(verify[type][param], param, type));
          break;
        case NExpressVerificationTypes.BODY:
          router.use(path, handleVerifyItem(verify[type][param], param, type));
          break;
        case NExpressVerificationTypes.PARAMS:
          router.param(
            param,
            handleVerifyItem(verify[type][param], param, type),
          );
          break;
      }
    });
  });
}
