package com.ut.scf.pojo.auto;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class SysConfigExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public SysConfigExample() {
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

        public Criteria andItemKeyIsNull() {
            addCriterion("ITEM_KEY is null");
            return (Criteria) this;
        }

        public Criteria andItemKeyIsNotNull() {
            addCriterion("ITEM_KEY is not null");
            return (Criteria) this;
        }

        public Criteria andItemKeyEqualTo(String value) {
            addCriterion("ITEM_KEY =", value, "itemKey");
            return (Criteria) this;
        }

        public Criteria andItemKeyNotEqualTo(String value) {
            addCriterion("ITEM_KEY <>", value, "itemKey");
            return (Criteria) this;
        }

        public Criteria andItemKeyGreaterThan(String value) {
            addCriterion("ITEM_KEY >", value, "itemKey");
            return (Criteria) this;
        }

        public Criteria andItemKeyGreaterThanOrEqualTo(String value) {
            addCriterion("ITEM_KEY >=", value, "itemKey");
            return (Criteria) this;
        }

        public Criteria andItemKeyLessThan(String value) {
            addCriterion("ITEM_KEY <", value, "itemKey");
            return (Criteria) this;
        }

        public Criteria andItemKeyLessThanOrEqualTo(String value) {
            addCriterion("ITEM_KEY <=", value, "itemKey");
            return (Criteria) this;
        }

        public Criteria andItemKeyLike(String value) {
            addCriterion("ITEM_KEY like", value, "itemKey");
            return (Criteria) this;
        }

        public Criteria andItemKeyNotLike(String value) {
            addCriterion("ITEM_KEY not like", value, "itemKey");
            return (Criteria) this;
        }

        public Criteria andItemKeyIn(List<String> values) {
            addCriterion("ITEM_KEY in", values, "itemKey");
            return (Criteria) this;
        }

        public Criteria andItemKeyNotIn(List<String> values) {
            addCriterion("ITEM_KEY not in", values, "itemKey");
            return (Criteria) this;
        }

        public Criteria andItemKeyBetween(String value1, String value2) {
            addCriterion("ITEM_KEY between", value1, value2, "itemKey");
            return (Criteria) this;
        }

        public Criteria andItemKeyNotBetween(String value1, String value2) {
            addCriterion("ITEM_KEY not between", value1, value2, "itemKey");
            return (Criteria) this;
        }

        public Criteria andItemValueIsNull() {
            addCriterion("ITEM_VALUE is null");
            return (Criteria) this;
        }

        public Criteria andItemValueIsNotNull() {
            addCriterion("ITEM_VALUE is not null");
            return (Criteria) this;
        }

        public Criteria andItemValueEqualTo(String value) {
            addCriterion("ITEM_VALUE =", value, "itemValue");
            return (Criteria) this;
        }

        public Criteria andItemValueNotEqualTo(String value) {
            addCriterion("ITEM_VALUE <>", value, "itemValue");
            return (Criteria) this;
        }

        public Criteria andItemValueGreaterThan(String value) {
            addCriterion("ITEM_VALUE >", value, "itemValue");
            return (Criteria) this;
        }

        public Criteria andItemValueGreaterThanOrEqualTo(String value) {
            addCriterion("ITEM_VALUE >=", value, "itemValue");
            return (Criteria) this;
        }

        public Criteria andItemValueLessThan(String value) {
            addCriterion("ITEM_VALUE <", value, "itemValue");
            return (Criteria) this;
        }

        public Criteria andItemValueLessThanOrEqualTo(String value) {
            addCriterion("ITEM_VALUE <=", value, "itemValue");
            return (Criteria) this;
        }

        public Criteria andItemValueLike(String value) {
            addCriterion("ITEM_VALUE like", value, "itemValue");
            return (Criteria) this;
        }

        public Criteria andItemValueNotLike(String value) {
            addCriterion("ITEM_VALUE not like", value, "itemValue");
            return (Criteria) this;
        }

        public Criteria andItemValueIn(List<String> values) {
            addCriterion("ITEM_VALUE in", values, "itemValue");
            return (Criteria) this;
        }

        public Criteria andItemValueNotIn(List<String> values) {
            addCriterion("ITEM_VALUE not in", values, "itemValue");
            return (Criteria) this;
        }

        public Criteria andItemValueBetween(String value1, String value2) {
            addCriterion("ITEM_VALUE between", value1, value2, "itemValue");
            return (Criteria) this;
        }

        public Criteria andItemValueNotBetween(String value1, String value2) {
            addCriterion("ITEM_VALUE not between", value1, value2, "itemValue");
            return (Criteria) this;
        }

        public Criteria andModuleNameIsNull() {
            addCriterion("MODULE_NAME is null");
            return (Criteria) this;
        }

        public Criteria andModuleNameIsNotNull() {
            addCriterion("MODULE_NAME is not null");
            return (Criteria) this;
        }

        public Criteria andModuleNameEqualTo(String value) {
            addCriterion("MODULE_NAME =", value, "moduleName");
            return (Criteria) this;
        }

        public Criteria andModuleNameNotEqualTo(String value) {
            addCriterion("MODULE_NAME <>", value, "moduleName");
            return (Criteria) this;
        }

        public Criteria andModuleNameGreaterThan(String value) {
            addCriterion("MODULE_NAME >", value, "moduleName");
            return (Criteria) this;
        }

        public Criteria andModuleNameGreaterThanOrEqualTo(String value) {
            addCriterion("MODULE_NAME >=", value, "moduleName");
            return (Criteria) this;
        }

        public Criteria andModuleNameLessThan(String value) {
            addCriterion("MODULE_NAME <", value, "moduleName");
            return (Criteria) this;
        }

        public Criteria andModuleNameLessThanOrEqualTo(String value) {
            addCriterion("MODULE_NAME <=", value, "moduleName");
            return (Criteria) this;
        }

        public Criteria andModuleNameLike(String value) {
            addCriterion("MODULE_NAME like", value, "moduleName");
            return (Criteria) this;
        }

        public Criteria andModuleNameNotLike(String value) {
            addCriterion("MODULE_NAME not like", value, "moduleName");
            return (Criteria) this;
        }

        public Criteria andModuleNameIn(List<String> values) {
            addCriterion("MODULE_NAME in", values, "moduleName");
            return (Criteria) this;
        }

        public Criteria andModuleNameNotIn(List<String> values) {
            addCriterion("MODULE_NAME not in", values, "moduleName");
            return (Criteria) this;
        }

        public Criteria andModuleNameBetween(String value1, String value2) {
            addCriterion("MODULE_NAME between", value1, value2, "moduleName");
            return (Criteria) this;
        }

        public Criteria andModuleNameNotBetween(String value1, String value2) {
            addCriterion("MODULE_NAME not between", value1, value2, "moduleName");
            return (Criteria) this;
        }

        public Criteria andItemNoteIsNull() {
            addCriterion("ITEM_NOTE is null");
            return (Criteria) this;
        }

        public Criteria andItemNoteIsNotNull() {
            addCriterion("ITEM_NOTE is not null");
            return (Criteria) this;
        }

        public Criteria andItemNoteEqualTo(String value) {
            addCriterion("ITEM_NOTE =", value, "itemNote");
            return (Criteria) this;
        }

        public Criteria andItemNoteNotEqualTo(String value) {
            addCriterion("ITEM_NOTE <>", value, "itemNote");
            return (Criteria) this;
        }

        public Criteria andItemNoteGreaterThan(String value) {
            addCriterion("ITEM_NOTE >", value, "itemNote");
            return (Criteria) this;
        }

        public Criteria andItemNoteGreaterThanOrEqualTo(String value) {
            addCriterion("ITEM_NOTE >=", value, "itemNote");
            return (Criteria) this;
        }

        public Criteria andItemNoteLessThan(String value) {
            addCriterion("ITEM_NOTE <", value, "itemNote");
            return (Criteria) this;
        }

        public Criteria andItemNoteLessThanOrEqualTo(String value) {
            addCriterion("ITEM_NOTE <=", value, "itemNote");
            return (Criteria) this;
        }

        public Criteria andItemNoteLike(String value) {
            addCriterion("ITEM_NOTE like", value, "itemNote");
            return (Criteria) this;
        }

        public Criteria andItemNoteNotLike(String value) {
            addCriterion("ITEM_NOTE not like", value, "itemNote");
            return (Criteria) this;
        }

        public Criteria andItemNoteIn(List<String> values) {
            addCriterion("ITEM_NOTE in", values, "itemNote");
            return (Criteria) this;
        }

        public Criteria andItemNoteNotIn(List<String> values) {
            addCriterion("ITEM_NOTE not in", values, "itemNote");
            return (Criteria) this;
        }

        public Criteria andItemNoteBetween(String value1, String value2) {
            addCriterion("ITEM_NOTE between", value1, value2, "itemNote");
            return (Criteria) this;
        }

        public Criteria andItemNoteNotBetween(String value1, String value2) {
            addCriterion("ITEM_NOTE not between", value1, value2, "itemNote");
            return (Criteria) this;
        }

        public Criteria andCreateTimeIsNull() {
            addCriterion("CREATE_TIME is null");
            return (Criteria) this;
        }

        public Criteria andCreateTimeIsNotNull() {
            addCriterion("CREATE_TIME is not null");
            return (Criteria) this;
        }

        public Criteria andCreateTimeEqualTo(Date value) {
            addCriterion("CREATE_TIME =", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeNotEqualTo(Date value) {
            addCriterion("CREATE_TIME <>", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeGreaterThan(Date value) {
            addCriterion("CREATE_TIME >", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeGreaterThanOrEqualTo(Date value) {
            addCriterion("CREATE_TIME >=", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeLessThan(Date value) {
            addCriterion("CREATE_TIME <", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeLessThanOrEqualTo(Date value) {
            addCriterion("CREATE_TIME <=", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeIn(List<Date> values) {
            addCriterion("CREATE_TIME in", values, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeNotIn(List<Date> values) {
            addCriterion("CREATE_TIME not in", values, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeBetween(Date value1, Date value2) {
            addCriterion("CREATE_TIME between", value1, value2, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeNotBetween(Date value1, Date value2) {
            addCriterion("CREATE_TIME not between", value1, value2, "createTime");
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