// 请求响应参数（不包含data）
export interface Result {
  code: string
  message: string
}

// 请求响应参数（包含data）
export interface ResultData<T = any> extends Result {
  data: T
}

// 分页响应参数
export interface ResPage<T> {
  list: T[]
  pageNum: number
  pageSize: number
  total: number
}

// 分页请求参数
export interface ReqPage {
  pageNum: number
  pageSize: number
}

export interface SelectResult {
  label: string
  value: string
}

// 文件上传模块
export namespace Upload {
  export interface ResFileUrl {
    fileUrl: string
  }
}

// 登录模块
export namespace Login {
  export interface ReqLoginForm {
    username: string
    password: string
  }
  export interface ResLogin {
    tokenValue: string
    tokenName: string
    user: { id: string; avatar: string; nickname: string; phone: string; status: number }
  }
  export interface ResAuthButtons {
    [key: string]: string[]
  }
}

// 用户管理模块
export namespace User {
  export type ReqUserParams = ReqPage

  export interface ResUser {
    id: string
    username: string
    openId: number
    avatar: string
    phone: string
    createTime: Date
    status: number
    nickname: string
    roleName: string
    roleId: string
  }
  export interface ResStatus {
    userLabel: string
    userValue: number
  }
  export interface ResGender {
    genderLabel: string
    genderValue: number
  }
  export interface ResDepartment {
    id: string
    name: string
    children?: ResDepartment[]
  }
  export interface ResRole {
    id: string
    name: string
    children?: ResDepartment[]
  }
}

// 系统管理模块
export namespace System {
  export interface MenuResult {
    value: string
    label: string
    sort?: number
    children: MenuResult[]
  }

  export interface MenuFrom {
    id?: string
    parentId?: string
    path: string
    name: string
    component?: string
    redirect?: string
    category?: string
    perm?: string
    sort?: number
    icon: string
    title: string
    link?: string
    hide: boolean
    full: boolean
    affix: boolean
    keepAlive: boolean
  }

  export interface RoleResult {
    id?: string
    name: string
    code: string
  }

  export interface AppConfigResult {
    id?: string
    type: number
    content: string
  }
}

// 日志模块
export namespace Logs {
  export type ReqLogsParams = ReqPage

  export interface LogResult {
    module: string
    type: string
    message: string
    takeUpTime: string
    userName: string
  }
}

// 商品模块
export namespace Wares {
  export type ReqWaresParams = ReqPage

  export interface WaresResult {
    id?: string
    name: string
    blurb: string
    categoryId: string
    firstDrawing: string
    swiperImages: string
    status: number
    startTime: Date
    endTime: Date
    inventory: number
    detail?: string
    timeStr?: any
    unit: string
    tags?: string
    tagsArray?: string[]
  }

  export interface CategoryResult {
    id?: string
    name: string
    sort: number
  }
}

// 营销管理模块
export namespace Marketing {
  export type ReqCouponParams = ReqPage

  export interface BannerResult {
    id?: string
    title: string
    status: number
    image: string
    router: string
    sort: number
  }

  export interface CouponResult {
    id?: string
    price: number
    fullPrice: number
    name: string
    effective: number
    used: boolean
    waresType: number
    memberHasMax: number
    waresIds?: string[]
  }
}

/* 会员管理 */
export namespace Members {
  export type ReqMembersParams = ReqPage

  export interface MemberResult {
    id?: string
    nickname: string
    avatar?: string
    openId: string
    status: number
    phone?: string
    integral: number
  }

  export interface MemberCouponParam {
    memberId: string
    couponId: string
    times: string[]
  }

  export interface MemberCouponResult {
    couponPrice: number
    couponFullPrice: number
    couponName: string
  }

  export interface MemberAddressResult {
    provinceName: string
    cityName: string
    countyName: string
    telNumber: string
    detailInfo?: string
    userName: string
  }

  /** 会员退单 */
  export type ReqMemberOrderParams = ReqPage

  export interface MemberOrderResult {
    id?: string
    createTime: Date
    status: number
    waresNum: number
    totalPrice: number
    deliverTime?: Date
    serveTime?: Date
    successTime?: Date
    refundTime?: Date
    refundType?: string
    refundReason?: string
    refundImages?: string
    refundStatus?: number
    refundAuditReason?: string
    refundAuditTime?: string
    member: MemberResult
    items: MemberOrderItemResult[]
    address: MemberAddressResult
    coupon?: MemberCouponResult
  }

  export interface MemberOrderItemResult {
    waresFirstDrawing: string
    waresName: string
  }

  /** 会员反馈 */
  export type ReqMembersOpinionParams = ReqPage

  export interface MemberOpinionResult {
    type: string
    createTime: Date
    images: string
    remarks?: string
    status: number
    feedbackTime?: Date
    feedback?: string
    memberName: string
    memberAvatar: string
  }
}
