package test.bean;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class FlowGuaranteeInfoExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public FlowGuaranteeInfoExample() {
        oredCriteria = new ArrayList<Criteria>();
    }

    public void setOrderByClause(String orderByClause) {
        this.orderByClause = orderByClause;
    }

    public String getOrderByClause() {
        return orderByClause;
    }

    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    public boolean isDistinct() {
        return distinct;
    }

    public List<Criteria> getOredCriteria() {
        return oredCriteria;
    }

    public void or(Criteria criteria) {
        oredCriteria.add(criteria);
    }

    public Criteria or() {
        Criteria criteria = createCriteriaInternal();
        oredCriteria.add(criteria);
        return criteria;
    }

    public Criteria createCriteria() {
        Criteria criteria = createCriteriaInternal();
        if (oredCriteria.size() == 0) {
            oredCriteria.add(criteria);
        }
        return criteria;
    }

    protected Criteria createCriteriaInternal() {
        Criteria criteria = new Criteria();
        return criteria;
    }

    public void clear() {
        oredCriteria.clear();
        orderByClause = null;
        distinct = false;
    }

    protected abstract static class GeneratedCriteria {
        protected List<Criterion> criteria;

        protected GeneratedCriteria() {
            super();
            criteria = new ArrayList<Criterion>();
        }

        public boolean isValid() {
            return criteria.size() > 0;
        }

        public List<Criterion> getAllCriteria() {
            return criteria;
        }

        public List<Criterion> getCriteria() {
            return criteria;
        }

        protected void addCriterion(String condition) {
            if (condition == null) {
                throw new RuntimeException("Value for condition cannot be null");
            }
            criteria.add(new Criterion(condition));
        }

        protected void addCriterion(String condition, Object value, String property) {
            if (value == null) {
                throw new RuntimeException("Value for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value));
        }

        protected void addCriterion(String condition, Object value1, Object value2, String property) {
            if (value1 == null || value2 == null) {
                throw new RuntimeException("Between values for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value1, value2));
        }

        public Criteria andGrtIdIsNull() {
            addCriterion("grt_id is null");
            return (Criteria) this;
        }

        public Criteria andGrtIdIsNotNull() {
            addCriterion("grt_id is not null");
            return (Criteria) this;
        }

        public Criteria andGrtIdEqualTo(String value) {
            addCriterion("grt_id =", value, "grtId");
            return (Criteria) this;
        }

        public Criteria andGrtIdNotEqualTo(String value) {
            addCriterion("grt_id <>", value, "grtId");
            return (Criteria) this;
        }

        public Criteria andGrtIdGreaterThan(String value) {
            addCriterion("grt_id >", value, "grtId");
            return (Criteria) this;
        }

        public Criteria andGrtIdGreaterThanOrEqualTo(String value) {
            addCriterion("grt_id >=", value, "grtId");
            return (Criteria) this;
        }

        public Criteria andGrtIdLessThan(String value) {
            addCriterion("grt_id <", value, "grtId");
            return (Criteria) this;
        }

        public Criteria andGrtIdLessThanOrEqualTo(String value) {
            addCriterion("grt_id <=", value, "grtId");
            return (Criteria) this;
        }

        public Criteria andGrtIdLike(String value) {
            addCriterion("grt_id like", value, "grtId");
            return (Criteria) this;
        }

        public Criteria andGrtIdNotLike(String value) {
            addCriterion("grt_id not like", value, "grtId");
            return (Criteria) this;
        }

        public Criteria andGrtIdIn(List<String> values) {
            addCriterion("grt_id in", values, "grtId");
            return (Criteria) this;
        }

        public Criteria andGrtIdNotIn(List<String> values) {
            addCriterion("grt_id not in", values, "grtId");
            return (Criteria) this;
        }

        public Criteria andGrtIdBetween(String value1, String value2) {
            addCriterion("grt_id between", value1, value2, "grtId");
            return (Criteria) this;
        }

        public Criteria andGrtIdNotBetween(String value1, String value2) {
            addCriterion("grt_id not between", value1, value2, "grtId");
            return (Criteria) this;
        }

        public Criteria andGrtNameIsNull() {
            addCriterion("grt_name is null");
            return (Criteria) this;
        }

        public Criteria andGrtNameIsNotNull() {
            addCriterion("grt_name is not null");
            return (Criteria) this;
        }

        public Criteria andGrtNameEqualTo(String value) {
            addCriterion("grt_name =", value, "grtName");
            return (Criteria) this;
        }

        public Criteria andGrtNameNotEqualTo(String value) {
            addCriterion("grt_name <>", value, "grtName");
            return (Criteria) this;
        }

        public Criteria andGrtNameGreaterThan(String value) {
            addCriterion("grt_name >", value, "grtName");
            return (Criteria) this;
        }

        public Criteria andGrtNameGreaterThanOrEqualTo(String value) {
            addCriterion("grt_name >=", value, "grtName");
            return (Criteria) this;
        }

        public Criteria andGrtNameLessThan(String value) {
            addCriterion("grt_name <", value, "grtName");
            return (Criteria) this;
        }

        public Criteria andGrtNameLessThanOrEqualTo(String value) {
            addCriterion("grt_name <=", value, "grtName");
            return (Criteria) this;
        }

        public Criteria andGrtNameLike(String value) {
            addCriterion("grt_name like", value, "grtName");
            return (Criteria) this;
        }

        public Criteria andGrtNameNotLike(String value) {
            addCriterion("grt_name not like", value, "grtName");
            return (Criteria) this;
        }

        public Criteria andGrtNameIn(List<String> values) {
            addCriterion("grt_name in", values, "grtName");
            return (Criteria) this;
        }

        public Criteria andGrtNameNotIn(List<String> values) {
            addCriterion("grt_name not in", values, "grtName");
            return (Criteria) this;
        }

        public Criteria andGrtNameBetween(String value1, String value2) {
            addCriterion("grt_name between", value1, value2, "grtName");
            return (Criteria) this;
        }

        public Criteria andGrtNameNotBetween(String value1, String value2) {
            addCriterion("grt_name not between", value1, value2, "grtName");
            return (Criteria) this;
        }

        public Criteria andGrtMsrIsNull() {
            addCriterion("grt_msr is null");
            return (Criteria) this;
        }

        public Criteria andGrtMsrIsNotNull() {
            addCriterion("grt_msr is not null");
            return (Criteria) this;
        }

        public Criteria andGrtMsrEqualTo(String value) {
            addCriterion("grt_msr =", value, "grtMsr");
            return (Criteria) this;
        }

        public Criteria andGrtMsrNotEqualTo(String value) {
            addCriterion("grt_msr <>", value, "grtMsr");
            return (Criteria) this;
        }

        public Criteria andGrtMsrGreaterThan(String value) {
            addCriterion("grt_msr >", value, "grtMsr");
            return (Criteria) this;
        }

        public Criteria andGrtMsrGreaterThanOrEqualTo(String value) {
            addCriterion("grt_msr >=", value, "grtMsr");
            return (Criteria) this;
        }

        public Criteria andGrtMsrLessThan(String value) {
            addCriterion("grt_msr <", value, "grtMsr");
            return (Criteria) this;
        }

        public Criteria andGrtMsrLessThanOrEqualTo(String value) {
            addCriterion("grt_msr <=", value, "grtMsr");
            return (Criteria) this;
        }

        public Criteria andGrtMsrLike(String value) {
            addCriterion("grt_msr like", value, "grtMsr");
            return (Criteria) this;
        }

        public Criteria andGrtMsrNotLike(String value) {
            addCriterion("grt_msr not like", value, "grtMsr");
            return (Criteria) this;
        }

        public Criteria andGrtMsrIn(List<String> values) {
            addCriterion("grt_msr in", values, "grtMsr");
            return (Criteria) this;
        }

        public Criteria andGrtMsrNotIn(List<String> values) {
            addCriterion("grt_msr not in", values, "grtMsr");
            return (Criteria) this;
        }

        public Criteria andGrtMsrBetween(String value1, String value2) {
            addCriterion("grt_msr between", value1, value2, "grtMsr");
            return (Criteria) this;
        }

        public Criteria andGrtMsrNotBetween(String value1, String value2) {
            addCriterion("grt_msr not between", value1, value2, "grtMsr");
            return (Criteria) this;
        }

        public Criteria andGrtAmtIsNull() {
            addCriterion("grt_amt is null");
            return (Criteria) this;
        }

        public Criteria andGrtAmtIsNotNull() {
            addCriterion("grt_amt is not null");
            return (Criteria) this;
        }

        public Criteria andGrtAmtEqualTo(BigDecimal value) {
            addCriterion("grt_amt =", value, "grtAmt");
            return (Criteria) this;
        }

        public Criteria andGrtAmtNotEqualTo(BigDecimal value) {
            addCriterion("grt_amt <>", value, "grtAmt");
            return (Criteria) this;
        }

        public Criteria andGrtAmtGreaterThan(BigDecimal value) {
            addCriterion("grt_amt >", value, "grtAmt");
            return (Criteria) this;
        }

        public Criteria andGrtAmtGreaterThanOrEqualTo(BigDecimal value) {
            addCriterion("grt_amt >=", value, "grtAmt");
            return (Criteria) this;
        }

        public Criteria andGrtAmtLessThan(BigDecimal value) {
            addCriterion("grt_amt <", value, "grtAmt");
            return (Criteria) this;
        }

        public Criteria andGrtAmtLessThanOrEqualTo(BigDecimal value) {
            addCriterion("grt_amt <=", value, "grtAmt");
            return (Criteria) this;
        }

        public Criteria andGrtAmtIn(List<BigDecimal> values) {
            addCriterion("grt_amt in", values, "grtAmt");
            return (Criteria) this;
        }

        public Criteria andGrtAmtNotIn(List<BigDecimal> values) {
            addCriterion("grt_amt not in", values, "grtAmt");
            return (Criteria) this;
        }

        public Criteria andGrtAmtBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("grt_amt between", value1, value2, "grtAmt");
            return (Criteria) this;
        }

        public Criteria andGrtAmtNotBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("grt_amt not between", value1, value2, "grtAmt");
            return (Criteria) this;
        }

        public Criteria andPriIdIsNull() {
            addCriterion("pri_id is null");
            return (Criteria) this;
        }

        public Criteria andPriIdIsNotNull() {
            addCriterion("pri_id is not null");
            return (Criteria) this;
        }

        public Criteria andPriIdEqualTo(String value) {
            addCriterion("pri_id =", value, "priId");
            return (Criteria) this;
        }

        public Criteria andPriIdNotEqualTo(String value) {
            addCriterion("pri_id <>", value, "priId");
            return (Criteria) this;
        }

        public Criteria andPriIdGreaterThan(String value) {
            addCriterion("pri_id >", value, "priId");
            return (Criteria) this;
        }

        public Criteria andPriIdGreaterThanOrEqualTo(String value) {
            addCriterion("pri_id >=", value, "priId");
            return (Criteria) this;
        }

        public Criteria andPriIdLessThan(String value) {
            addCriterion("pri_id <", value, "priId");
            return (Criteria) this;
        }

        public Criteria andPriIdLessThanOrEqualTo(String value) {
            addCriterion("pri_id <=", value, "priId");
            return (Criteria) this;
        }

        public Criteria andPriIdLike(String value) {
            addCriterion("pri_id like", value, "priId");
            return (Criteria) this;
        }

        public Criteria andPriIdNotLike(String value) {
            addCriterion("pri_id not like", value, "priId");
            return (Criteria) this;
        }

        public Criteria andPriIdIn(List<String> values) {
            addCriterion("pri_id in", values, "priId");
            return (Criteria) this;
        }

        public Criteria andPriIdNotIn(List<String> values) {
            addCriterion("pri_id not in", values, "priId");
            return (Criteria) this;
        }

        public Criteria andPriIdBetween(String value1, String value2) {
            addCriterion("pri_id between", value1, value2, "priId");
            return (Criteria) this;
        }

        public Criteria andPriIdNotBetween(String value1, String value2) {
            addCriterion("pri_id not between", value1, value2, "priId");
            return (Criteria) this;
        }

        public Criteria andCorpIdIsNull() {
            addCriterion("corp_id is null");
            return (Criteria) this;
        }

        public Criteria andCorpIdIsNotNull() {
            addCriterion("corp_id is not null");
            return (Criteria) this;
        }

        public Criteria andCorpIdEqualTo(String value) {
            addCriterion("corp_id =", value, "corpId");
            return (Criteria) this;
        }

        public Criteria andCorpIdNotEqualTo(String value) {
            addCriterion("corp_id <>", value, "corpId");
            return (Criteria) this;
        }

        public Criteria andCorpIdGreaterThan(String value) {
            addCriterion("corp_id >", value, "corpId");
            return (Criteria) this;
        }

        public Criteria andCorpIdGreaterThanOrEqualTo(String value) {
            addCriterion("corp_id >=", value, "corpId");
            return (Criteria) this;
        }

        public Criteria andCorpIdLessThan(String value) {
            addCriterion("corp_id <", value, "corpId");
            return (Criteria) this;
        }

        public Criteria andCorpIdLessThanOrEqualTo(String value) {
            addCriterion("corp_id <=", value, "corpId");
            return (Criteria) this;
        }

        public Criteria andCorpIdLike(String value) {
            addCriterion("corp_id like", value, "corpId");
            return (Criteria) this;
        }

        public Criteria andCorpIdNotLike(String value) {
            addCriterion("corp_id not like", value, "corpId");
            return (Criteria) this;
        }

        public Criteria andCorpIdIn(List<String> values) {
            addCriterion("corp_id in", values, "corpId");
            return (Criteria) this;
        }

        public Criteria andCorpIdNotIn(List<String> values) {
            addCriterion("corp_id not in", values, "corpId");
            return (Criteria) this;
        }

        public Criteria andCorpIdBetween(String value1, String value2) {
            addCriterion("corp_id between", value1, value2, "corpId");
            return (Criteria) this;
        }

        public Criteria andCorpIdNotBetween(String value1, String value2) {
            addCriterion("corp_id not between", value1, value2, "corpId");
            return (Criteria) this;
        }

        public Criteria andCreateTimeIsNull() {
            addCriterion("create_time is null");
            return (Criteria) this;
        }

        public Criteria andCreateTimeIsNotNull() {
            addCriterion("create_time is not null");
            return (Criteria) this;
        }

        public Criteria andCreateTimeEqualTo(Date value) {
            addCriterion("create_time =", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeNotEqualTo(Date value) {
            addCriterion("create_time <>", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeGreaterThan(Date value) {
            addCriterion("create_time >", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeGreaterThanOrEqualTo(Date value) {
            addCriterion("create_time >=", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeLessThan(Date value) {
            addCriterion("create_time <", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeLessThanOrEqualTo(Date value) {
            addCriterion("create_time <=", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeIn(List<Date> values) {
            addCriterion("create_time in", values, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeNotIn(List<Date> values) {
            addCriterion("create_time not in", values, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeBetween(Date value1, Date value2) {
            addCriterion("create_time between", value1, value2, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeNotBetween(Date value1, Date value2) {
            addCriterion("create_time not between", value1, value2, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateUserIdIsNull() {
            addCriterion("create_user_id is null");
            return (Criteria) this;
        }

        public Criteria andCreateUserIdIsNotNull() {
            addCriterion("create_user_id is not null");
            return (Criteria) this;
        }

        public Criteria andCreateUserIdEqualTo(String value) {
            addCriterion("create_user_id =", value, "createUserId");
            return (Criteria) this;
        }

        public Criteria andCreateUserIdNotEqualTo(String value) {
            addCriterion("create_user_id <>", value, "createUserId");
            return (Criteria) this;
        }

        public Criteria andCreateUserIdGreaterThan(String value) {
            addCriterion("create_user_id >", value, "createUserId");
            return (Criteria) this;
        }

        public Criteria andCreateUserIdGreaterThanOrEqualTo(String value) {
            addCriterion("create_user_id >=", value, "createUserId");
            return (Criteria) this;
        }

        public Criteria andCreateUserIdLessThan(String value) {
            addCriterion("create_user_id <", value, "createUserId");
            return (Criteria) this;
        }

        public Criteria andCreateUserIdLessThanOrEqualTo(String value) {
            addCriterion("create_user_id <=", value, "createUserId");
            return (Criteria) this;
        }

        public Criteria andCreateUserIdLike(String value) {
            addCriterion("create_user_id like", value, "createUserId");
            return (Criteria) this;
        }

        public Criteria andCreateUserIdNotLike(String value) {
            addCriterion("create_user_id not like", value, "createUserId");
            return (Criteria) this;
        }

        public Criteria andCreateUserIdIn(List<String> values) {
            addCriterion("create_user_id in", values, "createUserId");
            return (Criteria) this;
        }

        public Criteria andCreateUserIdNotIn(List<String> values) {
            addCriterion("create_user_id not in", values, "createUserId");
            return (Criteria) this;
        }

        public Criteria andCreateUserIdBetween(String value1, String value2) {
            addCriterion("create_user_id between", value1, value2, "createUserId");
            return (Criteria) this;
        }

        public Criteria andCreateUserIdNotBetween(String value1, String value2) {
            addCriterion("create_user_id not between", value1, value2, "createUserId");
            return (Criteria) this;
        }
    }

    public static class Criteria extends GeneratedCriteria {

        protected Criteria() {
            super();
        }
    }

    public static class Criterion {
        private String condition;

        private Object value;

        private Object secondValue;

        private boolean noValue;

        private boolean singleValue;

        private boolean betweenValue;

        private boolean listValue;

        private String typeHandler;

        public String getCondition() {
            return condition;
        }

        public Object getValue() {
            return value;
        }

        public Object getSecondValue() {
            return secondValue;
        }

        public boolean isNoValue() {
            return noValue;
        }

        public boolean isSingleValue() {
            return singleValue;
        }

        public boolean isBetweenValue() {
            return betweenValue;
        }

        public boolean isListValue() {
            return listValue;
        }

        public String getTypeHandler() {
            return typeHandler;
        }

        protected Criterion(String condition) {
            super();
            this.condition = condition;
            this.typeHandler = null;
            this.noValue = true;
        }

        protected Criterion(String condition, Object value, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.typeHandler = typeHandler;
            if (value instanceof List<?>) {
                this.listValue = true;
            } else {
                this.singleValue = true;
            }
        }

        protected Criterion(String condition, Object value) {
            this(condition, value, null);
        }

        protected Criterion(String condition, Object value, Object secondValue, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.secondValue = secondValue;
            this.typeHandler = typeHandler;
            this.betweenValue = true;
        }

        protected Criterion(String condition, Object value, Object secondValue) {
            this(condition, value, secondValue, null);
        }
    }
}