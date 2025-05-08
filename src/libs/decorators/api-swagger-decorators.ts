import { applyDecorators, Type } from "@nestjs/common";
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from "@nestjs/swagger";
import { PageDto } from "../utils/pagination/dto/page-dto-meta";
import { ResponseUserDto } from "src/service/user/dto/response-user.dto";
import { GenericFilter } from "../utils/pagination/dto/pagination-generic-filter.dto";
import { UserFilter } from "src/service/user/dto/filter-user.dto";

export const ApiPaginatedResponse = <TModel extends Type<any>>(
    model: TModel,
  ) => {
    return applyDecorators(
      ApiExtraModels(PageDto),
      ApiOkResponse({
        description: "Successfully received model list",
        schema: {
          allOf: [
            { $ref: getSchemaPath(PageDto) },
            {
              properties: {
                data: {
                  type: "array",
                  items: { $ref: getSchemaPath(model) },
                },
              },
            },
          ],
        },
      }),
    );
  };